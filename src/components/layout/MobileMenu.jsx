import React from 'react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import './MobileMenu.css';

export function MobileMenu({ isOpen, navItems, activeSection, onNavClick, onClose, lang, setLang, labels }) {
  return (
    <div
      id="mobile-menu"
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="mobile-menu-header container">
        <span className="brand">LUX MIKROCEMENT</span>
        <button type="button" className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
          ×
        </button>
      </div>
      <nav className="mobile-nav container">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeSection === item.id ? 'active' : ''}
            onClick={(event) => onNavClick(event, item.id, onClose)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mobile-menu-footer container">
        <LanguageSwitcher currentLang={lang} onChange={setLang} labels={labels} className="mobile-language-switcher" />
      </div>
    </div>
  );
}
