import React from 'react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import './Header.css';

export function Header({ navItems, activeSection, onNavClick, lang, setLang, labels, isMobileMenuOpen, onToggleMenu }) {
  return (
    <header className="topbar-wrap">
      <div className="topbar container">
        <span className="brand">LUX MIKROCEMENT</span>
        <nav className="nav nav-desktop">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(event) => onNavClick(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <LanguageSwitcher currentLang={lang} onChange={setLang} labels={labels} className="desktop-language-switcher" />
        <button
          type="button"
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
