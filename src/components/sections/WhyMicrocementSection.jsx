import React, { useLayoutEffect, useRef } from 'react';
import '../layout/Section.css';
import '../ui/SectionTitle.css';
import './WhyMicrocementSection.css';

const icons = [
  (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M9 20.5 24 8l15 12.5v17.8H9z" />
      <path d="M15 22h18" />
      <path d="M15 28h18" />
      <path d="M20 8h8" />
    </svg>
  ),
  (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="14" />
      <path d="m18.5 24 3.6 3.7 7.8-7.9" />
      <path d="M24 10v4" />
      <path d="M24 34v4" />
    </svg>
  ),
  (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="9" y="12" width="30" height="24" rx="6" />
      <path d="M24 12v24" />
      <path d="M9 24h30" />
      <path d="M15 30h7" />
    </svg>
  )
];

export function WhyMicrocementSection({ why }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      section.classList.add('is-visible');
      return;
    }

    section.classList.add('why-ready');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        section.classList.add('is-visible');
        observer.unobserve(section);
      }
    }, { threshold: 0.01, rootMargin: '0px 0px -15% 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      className="section why-microcement"
    >
      <div className="container">
        <div className="section-heading">
          <h2 className="why-enter why-enter-title">{why?.title || ''}</h2>
          {why?.intro ? <p className="section-intro why-enter why-enter-intro">{why.intro}</p> : null}
        </div>
      <div className="why-microcement-grid" role="list">
        {(why?.items || []).map((item, index) => (
          <article
            key={item.title || index}
            className="why-microcement-card why-enter"
            style={{ '--why-delay': `${300 + index * 140}ms` }}
            role="listitem"
          >
            <span
              className="why-microcement-icon"
              aria-hidden="true"
            >
              {icons[index % icons.length]}
            </span>

            <h3>
              {item.title}
            </h3>

            <p>
              {item.text}
            </p>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
