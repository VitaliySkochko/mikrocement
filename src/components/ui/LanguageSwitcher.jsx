import React from 'react';
import './LanguageSwitcher.css';

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
