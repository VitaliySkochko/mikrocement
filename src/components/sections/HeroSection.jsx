import React from 'react';
import { Button } from '../ui/Button';
import './HeroSection.css';

export function HeroSection({ hero, onNavClick }) {
  return (
    <section id="hero" className="hero">
      <div className="container hero-shell">
        <div className="hero-copy reveal" data-reveal="hero">
          <p className="hero-label">Architectural Surface Atelier</p>
          <p className="badge">{hero.badge}</p>
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <div className="hero-cta reveal reveal-stagger" data-reveal="cta" style={{ '--reveal-delay': '140ms' }}>
            <Button variant="primary" href="#contact" onClick={(event) => onNavClick(event, 'contact')}>
              {hero.primaryCta}
            </Button>
            <Button variant="ghost" href="#services" onClick={(event) => onNavClick(event, 'services')}>
              {hero.secondaryCta}
            </Button>
          </div>
        </div>

      
      </div>
    </section>
  );
}
