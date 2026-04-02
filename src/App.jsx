import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from './components/layout/Header';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { WhyMicrocementSection } from './components/sections/WhyMicrocementSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { GallerySection } from './components/sections/GallerySection';
import { ApproachSection } from './components/sections/ApproachSection';
import { CoverageSection } from './components/sections/CoverageSection';
import { ContactSection } from './components/sections/ContactSection';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { useActiveSection } from './hooks/useActiveSection';
import { translations } from './i18n/translations';

export default function App() {
  const [lang, setLang] = useState('pl');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const t = useMemo(() => translations[lang] || translations.pl, [lang]);

  const navItems = useMemo(
    () => [
      { id: 'hero', label: t.nav.hero },
      { id: 'why', label: t.nav.why },
      { id: 'gallery', label: t.nav.gallery },
      { id: 'approach', label: t.nav.approach },
      { id: 'services', label: t.nav.services },
      { id: 'coverage', label: t.nav.coverage },
      { id: 'contact', label: t.nav.contact }
    ],
    [t]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.add('js-ready');
    return () => document.documentElement.classList.remove('js-ready');
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.classList.remove('menu-open');
      return undefined;
    }

    document.body.classList.add('menu-open');
    return () => document.body.classList.remove('menu-open');
  }, [isMobileMenuOpen]);

  useRevealOnScroll(lang);
  useActiveSection(navItems, setActiveSection);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const topbarHeight = document.querySelector('.topbar-wrap')?.offsetHeight ?? 0;
    const offsetTop = section.getBoundingClientRect().top + window.scrollY - topbarHeight - 18;

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
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

  return (
    <div className="app">
      <Header
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        lang={lang}
        setLang={setLang}
        labels={t}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        onNavClick={handleNavClick}
        onClose={() => setIsMobileMenuOpen(false)}
        lang={lang}
        setLang={setLang}
        labels={t}
      />

      <main>
        <HeroSection hero={t.hero} onNavClick={handleNavClick} />
        <WhyMicrocementSection why={t.why} />
        <GallerySection gallery={t.gallery} />
        <ApproachSection approach={t.approach} />
        <ServicesSection services={t.services} />
        <CoverageSection coverage={t.coverage} />
        <ContactSection contact={t.contact} />
      </main>

      <Footer text={t.footer} />
    </div>
  );
}