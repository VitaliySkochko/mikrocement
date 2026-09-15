import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';
const source = fs.readFileSync('src/firebase/analytics.js', 'utf8');
function harness({ prod = true, host = 'luxmikrocement.com', supported = true, failure, browser = true } = {}) {
  const calls = [], configs = [];
  let imports = 0;
  const app = {};
  const sdk = {
    isSupported: async () => { if (failure === 'support') throw Error(); return supported; },
    initializeAnalytics: (receivedApp, options) => {
      assert.equal(receivedApp, app);
      if (failure === 'init') throw Error();
      configs.push(options); return {};
    },
    logEvent: (_, name, params) => { if (failure === 'log') throw Error(); calls.push({ name, params }); },
  };
  const context = {
    module: { exports: {} }, document: { title: 'LUX MIKROCEMENT' },
    loadSDK: async () => { imports++; if (failure === 'import') throw Error(); return sdk; },
    loadConfig: async () => ({ app }),
  };
  if (browser) context.window = { location: { hostname: host, origin: `https://${host}`, pathname: '/', search: '?email=private', hash: '#contact' } };
  const code = source.replace('import.meta.env.PROD', String(prod))
    .replace("import('firebase/analytics')", 'loadSDK()').replace("import('./config')", 'loadConfig()');
  vm.runInNewContext(transformSync(code, { format: 'cjs' }).code, context);
  return { api: context.module.exports, calls, configs, context, imports: () => imports };
}
const flush = () => new Promise(resolve => setImmediate(resolve));
const h = harness();
h.api.trackPageView(); h.api.trackPageView();
h.api.trackEvent('phone_clicked', { phone: 'private' });
h.api.trackEvent('phone_clicked');
h.api.trackEvent('service_opened', { service_name: 'Public service', email: 'private' });
h.api.trackContactFormStarted(); h.api.trackContactFormStarted();
h.api.trackEvent('unknown', { name: 'private' });
await flush();
assert.equal(h.imports(), 1); assert.equal(h.configs.length, 1);
assert.equal(h.configs[0].config.send_page_view, false);
assert.equal(h.calls.filter(e => e.name === 'page_view').length, 1);
assert.equal(h.calls.filter(e => e.name === 'phone_clicked').length, 2);
assert.equal(h.calls.filter(e => e.name === 'contact_form_started').length, 1);
assert.equal(h.calls[0].params.page_location, 'https://luxmikrocement.com/');
assert.ok(!JSON.stringify(h.calls).includes('private'));
h.context.window.location.hash = '#services'; h.api.trackPageView(); await flush();
assert.equal(h.calls.filter(e => e.name === 'page_view').length, 1);
for (const options of [{ prod: false }, { host: 'localhost' }, { host: '127.0.0.1' }, { host: 'preview.web.app' }, { browser: false }]) {
  const t = harness(options); t.api.trackPageView(); t.api.trackEvent('email_clicked'); await flush();
  assert.equal(t.imports(), 0); assert.equal(t.calls.length, 0);
}
for (const options of [{ supported: false }, ...['support','init','import','log'].map(failure => ({ failure }))]) {
  const t = harness(options); t.api.trackPageView(); t.api.trackEvent('email_clicked'); await flush();
  assert.equal(t.calls.length, 0);
}
// All existing Firebase services still share exactly the original app.
const config = fs.readFileSync('src/firebase/config.js','utf8');
assert.equal((config.match(/initializeApp\(firebaseConfig\)/g)||[]).length, 1);
for (const service of ['getAuth','getFirestore','getStorage']) assert.ok(config.includes(`${service}(app)`));
const contact = fs.readFileSync('src/components/sections/ContactSection.jsx','utf8');
assert.match(contact, /\.then\(\(\) => \{\s*trackEvent\("contact_form_submitted"\)/);
assert.equal((contact.match(/trackEvent\("contact_form_submitted"\)/g)||[]).length,1);
assert.ok(contact.includes("window.fbq('track', 'Lead')"));
assert.ok(fs.readFileSync('index.html','utf8').includes("fbq('track', 'PageView')"));
console.log('PASS: singleton, page_view deduplication, early events, parameter filtering, form start once, development/SSR guards, unsupported/blocked SDK, existing Firebase services and Meta Pixel');
// Exercise the actual form success/failure handlers without sending an email.
for (const succeeds of [true, false]) {
  const events = [];
  const ctx = {
    module: { exports: {} },
    React: { createElement: (type, props, ...children) => ({ type, props, children }) },
    useState: value => [value, () => {}],
    trackEvent: name => events.push(name), trackContactFormStarted: () => {},
    emailjs: { sendForm: () => succeeds ? Promise.resolve() : Promise.reject(Error('test failure')) },
    console: { error: () => {} },
  };
  const code = contact.replace(/^import .*;$/gm, '').replace(/import\.meta\.env\.\w+/g, "'test'");
  vm.runInNewContext(transformSync(code, { loader: 'jsx', format: 'cjs' }).code, ctx);
  const tree = ctx.module.exports.ContactSection({});
  const findForm = node => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'form') return node;
    return node.children?.map(findForm).find(Boolean);
  };
  findForm(tree).props.onSubmit({ preventDefault() {}, target: { reset() {} } });
  await flush();
  assert.equal(events.includes('contact_form_submitted'), succeeds);
}
console.log('PASS: real form handlers emit submitted only after resolved sendForm, never on rejection');
