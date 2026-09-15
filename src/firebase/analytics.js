// Only the public production site sends analytics. No SDK import on localhost/SSR.
const productionHosts = new Set(['luxmikrocement.com', 'www.luxmikrocement.com']);
const allowedEvents = new Set([
  'consultation_clicked', 'services_clicked', 'phone_clicked', 'email_clicked', 'facebook_clicked',
  'gallery_next', 'gallery_previous',
  'contact_clicked', 'service_opened', 'contact_form_started', 'contact_form_submitted',
]);
let initialization;
let pageViewScheduled = false;
let formStarted = false;
let pending = [];

export function isAnalyticsEnabled() {
  return import.meta.env.PROD && typeof window !== 'undefined' &&
    productionHosts.has(window.location.hostname) && window.location.pathname === '/';
}

function pageParameters() {
  return {
    // Strip query strings and fragments so arbitrary URL/form data cannot leak.
    page_location: `${window.location.origin}/`,
    page_path: '/',
    page_title: document.title,
  };
}

function initialize() {
  if (!initialization) {
    initialization = (async () => {
      try {
        const sdk = await import('firebase/analytics');
        if (!(await sdk.isSupported())) return null;
        const { app } = await import('./config');
        const analytics = sdk.initializeAnalytics(app, {
          config: {
            send_page_view: false,
            ...pageParameters(),
            page_referrer: '',
            allow_google_signals: false,
          },
        });
        return { analytics, logEvent: sdk.logEvent };
      } catch {
        return null;
      }
    })();
  }
  return initialization;
}

function enqueue(name, parameters) {
  if (!isAnalyticsEnabled() || pending.length >= 64) return;
  pending.push({ name, parameters });
  // Rendering and user actions never await analytics readiness.
  void initialize().then((client) => {
    const events = pending;
    pending = [];
    if (!client) return;
    for (const event of events) {
      try {
        client.logEvent(client.analytics, event.name, event.parameters);
      } catch {
        // Blocked analytics must never affect navigation, form submission or UI.
      }
    }
  }).catch(() => { pending = []; });
}

export function trackPageView() {
  if (!isAnalyticsEnabled() || pageViewScheduled) return;
  // Set synchronously: React StrictMode / component remounts cannot duplicate it.
  pageViewScheduled = true;
  enqueue('page_view', pageParameters());
}

export function trackEvent(name, parameters = {}) {
  if (!allowedEvents.has(name) || !isAnalyticsEnabled()) return;
  trackPageView();
  // Only a public service label is accepted; never forward arbitrary form data.
  const safeParameters = name === 'service_opened' && typeof parameters.service_name === 'string'
    ? { service_name: parameters.service_name.slice(0, 100) }
    : {};
  enqueue(name, safeParameters);
}

export function trackContactFormStarted() {
  if (formStarted || !isAnalyticsEnabled()) return;
  formStarted = true;
  trackEvent('contact_form_started');
}
