import React from 'react';

export function LanguageSwitcher({ currentLang, onChange, labels }) {
  return (
    <div className="language-switcher" aria-label={labels.switchLabel}>
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
        <div className="section-heading">
          <h2>{title}</h2>
          {intro ? <p className="section-intro">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Card({ title, text, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
