import React from 'react';
import { Button } from '../ui/Button';
import './HeroSection.css';

export function HeroSection({ hero, onNavClick }) {
  return (
    <section id="hero" className="hero">
      <div className="container hero-shell">
        <div className="hero-copy reveal" data-reveal>
          <p className="hero-label">Architectural Surface Atelier</p>
          <p className="badge">{hero.badge}</p>
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <div className="hero-cta reveal reveal-stagger" data-reveal>
            <Button variant="primary" href="#contact" onClick={(event) => onNavClick(event, 'contact')}>
              {hero.primaryCta}
            </Button>
            <Button variant="ghost" href="#services" onClick={(event) => onNavClick(event, 'services')}>
              {hero.secondaryCta}
            </Button>
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
  );
}
