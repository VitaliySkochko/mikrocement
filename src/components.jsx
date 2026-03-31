import React from 'react';

export function LanguageSwitcher({ currentLang, onChange, labels, className = '' }) {
  return (
    <div className={`language-switcher ${className}`.trim()} aria-label={labels.switchLabel}>
      {['en', 'pl'].map((lang) => (
        <button
          key={lang}
          type="button"
          className={`lang-btn ${currentLang === lang ? 'active' : ''}`}
          onClick={() => onChange(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Section({ id, title, children, intro }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <div className="section-heading reveal" data-reveal>
          <h2>{title}</h2>
          {intro ? <p className="section-intro">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Card({ title, text, className = '', delay = 0 }) {
  return (
    <article className={`card reveal ${className}`.trim()} data-reveal style={{ '--reveal-delay': `${delay}ms` }}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
