import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import { Card, LanguageSwitcher, Section } from './components';

export default function App() {
  const [lang, setLang] = useState('pl');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const t = useMemo(() => translations[lang], [lang]);
  const navItems = [
    { id: 'hero', label: t.nav.hero },
    { id: 'why', label: t.nav.why },
    { id: 'services', label: t.nav.services },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'approach', label: t.nav.approach },
    { id: 'coverage', label: t.nav.coverage },
    { id: 'contact', label: t.nav.contact }
  ];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.classList.remove('menu-open');
      return undefined;
    }

    document.body.classList.add('menu-open');
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        element.classList.add('is-visible');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        setActiveSection(visibleEntries[0].target.id);
      },
      {
        rootMargin: '-32% 0px -48% 0px',
        threshold: [0.2, 0.35, 0.55, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const topbarHeight = document.querySelector('.topbar-wrap')?.offsetHeight ?? 0;
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - topbarHeight - 18;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });

    window.history.replaceState(null, '', `#${sectionId}`);
    setActiveSection(sectionId);
  }, []);

  const handleNavClick = useCallback(
    (event, sectionId, onNavigate) => {
      event.preventDefault();
      scrollToSection(sectionId);
      onNavigate?.();
    },
    [scrollToSection]
  );

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <div className="app">
      <header className="topbar-wrap">
        <div className="topbar container">
          <span className="brand">LUX MIKROCEMENT</span>
          <nav className="nav nav-desktop">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher currentLang={lang} onChange={setLang} labels={t} className="desktop-language-switcher" />
          <button
            type="button"
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header container">
          <span className="brand">LUX MIKROCEMENT</span>
          <button type="button" className="mobile-menu-close" onClick={closeMobileMenu} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav className="mobile-nav container">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'active' : ''}
              onClick={(event) => handleNavClick(event, item.id, closeMobileMenu)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer container">
          <LanguageSwitcher currentLang={lang} onChange={setLang} labels={t} className="mobile-language-switcher" />
        </div>
      </div>

      <main>
        <section id="hero" className="hero">
          <div className="container hero-shell">
            <div className="hero-copy reveal" data-reveal>
              <p className="hero-label">Architectural Surface Atelier</p>
              <p className="badge">{t.hero.badge}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero-subtitle">{t.hero.subtitle}</p>
              <div className="hero-cta reveal reveal-stagger" data-reveal>
                <a className="btn btn-primary" href="#contact" onClick={(event) => handleNavClick(event, 'contact')}>
                  {t.hero.primaryCta}
                </a>
                <a className="btn btn-ghost" href="#services" onClick={(event) => handleNavClick(event, 'services')}>
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            <aside className="hero-visual reveal" aria-hidden="true" data-reveal style={{ '--reveal-delay': '80ms' }}>
              <div className="visual-block visual-main" />
              <div className="visual-block visual-column" />
              <div className="visual-block visual-thin" />
              <div className="visual-signature">LUX</div>
            </aside>
          </div>
        </section>

        <Section id="why" title={t.why.title} intro={t.why.intro}>
          <div className="grid grid-3">
            {t.why.items.map((item, index) => (
              <Card key={item.title} title={item.title} text={item.text} delay={index * 80} />
            ))}
          </div>
        </Section>

        <Section id="services" title={t.services.title}>
          <ul className="service-list">
            {t.services.items.map((item, index) => (
              <li key={item} className="reveal" data-reveal style={{ '--reveal-delay': `${index * 60}ms` }}>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="gallery" title={t.gallery.title} intro={t.gallery.intro}>
          <div className="gallery-grid">
            {t.gallery.items.map((item, index) => (
              <article
                key={item.title}
                className="gallery-card reveal"
                data-reveal
                style={{ '--reveal-delay': `${index * 75}ms` }}
              >
                <div className="gallery-image-wrap">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="gallery-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="approach" title={t.approach.title}>
          <div className="grid grid-2">
            {t.approach.steps.map((step, index) => (
              <Card
                key={step.title}
                title={step.title}
                text={step.text}
                className={index % 2 ? 'card-offset' : ''}
                delay={index * 85}
              />
            ))}
          </div>
        </Section>

        <Section id="coverage" title={t.coverage.title}>
          <div className="coverage-callout reveal" data-reveal>
            <p>{t.coverage.text}</p>
          </div>
        </Section>

        <section id="contact" className="section section-highlight">
          <div className="container contact-wrap">
            <div className="contact-copy reveal" data-reveal>
              <p className="hero-label">Private Design Consultation</p>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.text}</p>
              <p className="contact-note">{t.contact.note}</p>
            </div>
            <form className="contact-form reveal" action="mailto:contact@luxmikrocement.pl" method="post" data-reveal>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" placeholder="Your full name" required />

              <label htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required />

              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell us about your project..."
                required
              />

              <button type="submit" className="btn btn-primary">
                Request a Quote
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
}
