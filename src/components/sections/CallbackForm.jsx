import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import santaAnimation from '../assets/img/callback-santa.webp';

const languages = { pl: 'Polski', en: 'English', uk: 'Українська', ru: 'Русский' };

export function CallbackForm({ labels, lang, sectionRef }) {
  const inlineRef = useRef(null);
  const barRef = useRef(null);
  const focusTarget = useRef(null);
  const [barVisible, setBarVisible] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      const nextVisible = !entry.isIntersecting;
      const outgoing = nextVisible ? inlineRef.current : barRef.current;
      if (outgoing?.contains(document.activeElement)) {
        focusTarget.current = document.activeElement.dataset.callbackControl;
      }
      setBarVisible(nextVisible);
    });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  useLayoutEffect(() => {
    const control = focusTarget.current;
    focusTarget.current = null;
    if (!control) return;

    const incoming = barVisible ? barRef.current : inlineRef.current;
    incoming.querySelector(`[data-callback-control="${control}"]`)?.focus({ preventScroll: true });
  }, [barVisible]);

  const [preferredLanguage, setLanguage] = useState(null);
  const language = preferredLanguage ?? lang;
  const [status, setStatus] = useState(null);
  const pending = useRef(false);

  const submit = async (event) => {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const number = phone.trim();
    if (!/^\+[1-9][0-9\s()-]{6,24}$/.test(number) || !/^\d{7,15}$/.test(number.replace(/\D/g, ''))) {
      form.elements.phone.setCustomValidity(labels.invalidPhone);
      form.elements.phone.reportValidity();
      return;
    }
    // Reuse the existing template's name/phone/email/message fields. Include
    // every callback detail in message even if the template has no new fields.
    form.elements.message.value = `Тип заявки: Зворотний дзвінок / Prośba o kontakt telefoniczny\nTelefon: ${number}\nJęzyk rozmowy: ${languages[language]}`;
    pending.current = true;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setPhone('');
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      pending.current = false;
    }
  };

  const updatePhone = (event) => {
    inlineRef.current.elements.phone.setCustomValidity('');
    barRef.current.elements.phone.setCustomValidity('');
    setPhone(event.currentTarget.value);
    setStatus(null);
  };

  const renderForm = (compact) => {
    const prefix = compact ? 'callback-bar' : 'callback';
    const hidden = compact && !barVisible;

    return (
      <form
        ref={compact ? barRef : inlineRef}
        className={compact ? 'callback-form callback-bar' : 'callback-form callback-inline reveal'}
        data-reveal={compact ? undefined : 'callback'}
        data-visible={compact ? barVisible : undefined}
        inert={hidden ? '' : undefined}
        aria-hidden={hidden || undefined}
        aria-labelledby={`${prefix}-title`}
        aria-busy={status === 'sending'}
        onSubmit={submit}
      >
        {compact && (
          <span className="callback-bar-santa" aria-hidden="true">
            <img src={santaAnimation} alt="" width="358" height="357" loading="lazy" decoding="async" />
          </span>
        )}
        <h3 id={`${prefix}-title`}>{labels.title}</h3>
        {!compact && <p>{labels.text}</p>}
        <input type="hidden" name="name" value="Зворотний дзвінок / Callback" />
        <input type="hidden" name="email" value="" />
        <input type="hidden" name="request_type" value="Зворотний дзвінок" />
        <input type="hidden" name="language" value={languages[language]} />
        <input type="hidden" name="message" defaultValue="" />
        <label htmlFor={`${prefix}-phone`}>{labels.phone}</label>
        <input
          id={`${prefix}-phone`}
          data-callback-control="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+48 000 000 000"
          required
          maxLength={26}
          disabled={status === 'sending'}
          aria-describedby={compact ? undefined : `${prefix}-phone-hint`}
          value={phone}
          onChange={updatePhone}
        />
        {!compact && <small id={`${prefix}-phone-hint`}>{labels.hint}</small>}
        <fieldset disabled={status === 'sending'}>
          <legend>{labels.language}</legend>
          <div className="callback-languages">
            {Object.entries(languages).map(([code, name]) => {
              const abbreviation = code === 'uk' ? 'UA' : code.toUpperCase();
              return (
                <button
                  key={code}
                  type="button"
                  data-callback-control={code}
                  aria-pressed={language === code}
                  className={language === code ? 'is-selected' : ''}
                  onClick={() => setLanguage(code)}
                  aria-label={compact ? `${abbreviation} — ${name}` : undefined}
                >
                  {compact ? abbreviation : name}
                </button>
              );
            })}
          </div>
        </fieldset>
        <button className="btn btn-primary callback-submit" type="submit" data-callback-control="submit" disabled={status === 'sending'}>{status === 'sending' ? labels.sending : labels.title}</button>
        <div className="callback-status" role="status" aria-live={compact === barVisible ? 'polite' : 'off'}>
          {status === 'success' && <p className="form-message success">{labels.success}</p>}
          {status === 'error' && <p className="form-message error">{labels.error}</p>}
        </div>
      </form>
    );
  };

  return (
    <>
      {renderForm(false)}
      {renderForm(true)}
    </>
  );
}
