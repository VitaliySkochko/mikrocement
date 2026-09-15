# Firebase Analytics / GA4

Existing Firebase app: luxmikrocement-8b6da. Measurement ID: G-PRT6CM35EQ.
The existing Auth, Firestore and Storage exports use the same app. No second app is created.

Analytics loads asynchronously only in a production build on luxmikrocement.com or www.luxmikrocement.com, on the public `/` page. Development, localhost, preview domains and initial admin-route visits do not initialize Analytics. Meta Pixel remains independent.

`src/firebase/analytics.js` owns SDK loading, isSupported(), initialization, a bounded queue (64 pending events), error handling, permitted event names and parameters. Unsupported/blocked Analytics drops events without affecting the UI. No retries or rendering dependency.

## Page views

One manual page_view per document load of the public landing page, with page_location, page_path and page_title. Hash navigation, language changes and React StrictMode do not duplicate it. Query strings and fragments are removed; referrer is suppressed. Admin routes are not intentionally tracked. Automatic initial page_view is disabled with send_page_view: false.

## REQUIRED stream settings before deployment

1. In the existing Firebase project, verify the existing web app is linked to GA4 stream G-PRT6CM35EQ (Firebase can fetch its stream configuration remotely). Do not create another project/app.
2. GA4 → Admin → Data streams → this web stream → Enhanced measurement settings → Page views → Advanced settings: disable **Page changes based on browser history events**. send_page_view: false alone does not disable this separate source of page views. This site calls history.replaceState for section navigation.
3. Disable Enhanced measurement **Form interactions**. The custom form events below are intentional, and success is measured only after EmailJS resolves.
4. Disable user-provided data collection / automatic user-provided data detection for this stream if enabled. Never configure GA to collect form field values. Helpers pass no names, phone numbers, emails or messages. Public service titles are the only custom parameter.
5. Confirm no other tag/GTM configuration sends page_view to the same measurement ID.

These console settings are not editable through this repository and were not changed by this implementation.

## Events

| Event | Trigger |
|---|---|
| page_view | Once per public page load |
| consultation_clicked | Hero consultation CTA |
| services_clicked | Hero services CTA |
| phone_clicked | Every click on the revealed tel link; revealing the number only fires the existing Meta Lead |
| email_clicked | Every click on the mailto link |
| contact_clicked | Contact section navigation through desktop/mobile nav or consultation CTA (the latter also fires consultation_clicked) |
| service_opened | User opens an accordion item; service_name is its public title. Not on closing or initial default-open state |
| contact_form_started | First focus/change in the contact form, once per document |
| contact_form_submitted | Only after EmailJS sendForm resolves successfully; not on click, validation failure or rejection |

## DebugView after deployment

1. Complete the stream settings above and deploy the production build.
2. In Chrome enable the Google Analytics Debugger extension, then reload the real domain. Localhost remains disabled even in debug mode. Temporarily allow Analytics in any blocking extension for this test browser.
3. Open GA4 Admin → DebugView (or Firebase Analytics → DebugView), select the test device.
4. Expect one page_view after reload. Scroll, use section links and change language: no extra page_view should appear.
5. Test both Hero buttons, mailto/tel clicks, and each accordion item. Inspect service_name. The default-open item must be closed then reopened to test service_opened.
6. Focus/type in multiple form fields: one contact_form_started only. A successful real test submission should create contact_form_submitted. An invalid form or failed request must not. The test submission sends an actual email; use an agreed test message.
7. Check event parameters contain no form values. Disable the debugger extension after testing.

## Validation

Run `node scripts/test-analytics.mjs` and `npm run build`.
Mocks exercise support/import/init/log failures, development and SSR guards, singleton initialization, queued events, page-view deduplication and parameter filtering without sending data to Google. Auth/Firestore/Storage initialization paths remain unchanged; live authenticated backend operations and GA server receipt require post-deploy verification.

References:
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://firebase.google.com/docs/analytics/debugview
- https://firebase.google.com/docs/reference/js/analytics
