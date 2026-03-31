import React, { useEffect, useMemo, useState } from 'react';
import { translations } from './translations';
import { Card, LanguageSwitcher, Section } from './components';

export default function App() {
  const [lang, setLang] = useState('pl');
  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="app">
      <header className="topbar container">
        <span className="brand">LUX MIKROCEMENT</span>
        <nav className="nav">
          <a href="#hero">{t.nav.hero}</a>
          <a href="#why">{t.nav.why}</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#gallery">{t.nav.gallery}</a>
          <a href="#approach">{t.nav.approach}</a>
          <a href="#coverage">{t.nav.coverage}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <LanguageSwitcher currentLang={lang} onChange={setLang} labels={t} />
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="container hero-content">
            <p className="badge">{t.hero.badge}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#contact">
                {t.hero.primaryCta}
              </a>
              <a className="btn btn-ghost" href="#services">
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <Section id="why" title={t.why.title} intro={t.why.intro}>
          <div className="grid grid-3">
            {t.why.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.text} />
            ))}
          </div>
        </Section>

        <Section id="services" title={t.services.title}>
          <ul className="service-list">
            {t.services.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="gallery" title={t.gallery.title} intro={t.gallery.intro}>
          <div className="gallery-grid">
            {t.gallery.items.map((item) => (
              <article key={item.title} className="gallery-card">
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
            {t.approach.steps.map((step) => (
              <Card key={step.title} title={step.title} text={step.text} />
            ))}
          </div>
        </Section>

        <Section id="coverage" title={t.coverage.title}>
          <p>{t.coverage.text}</p>
        </Section>

        <section id="contact" className="section section-highlight">
          <div className="container contact-wrap">
            <div className="contact-copy">
              <h2>{t.contact.title}</h2>
              <p>{t.contact.text}</p>
              <p className="contact-note">{t.contact.note}</p>
            </div>
            <form className="contact-form" action="mailto:contact@luxmikrocement.pl" method="post">
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
