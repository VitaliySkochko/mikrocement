import React from 'react';
import { Button } from '../ui/Button';
import './HeroSection.css';

export function HeroSection({ hero, onNavClick }) {
  return (
    <section id="hero" className="hero">
      <div className="container hero-shell">
        <div className="hero-copy">
          <p className="hero-label hero-animate hero-animate-1">
            Architectural Surface Atelier
          </p>

          <p className="badge hero-animate hero-animate-2">
            {hero.badge}
          </p>

          <h1 className="hero-title hero-animate hero-animate-3">
            {hero.title}
          </h1>

          <p className="hero-subtitle hero-animate hero-animate-4">
            {hero.subtitle}
          </p>

          <div className="hero-cta hero-animate hero-animate-5">
            <Button
              variant="primary"
              href="#contact"
              onClick={(event) => onNavClick(event, 'contact')}
            >
              {hero.primaryCta}
            </Button>

            <Button
              variant="ghost"
              href="#services"
              onClick={(event) => onNavClick(event, 'services')}
            >
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}