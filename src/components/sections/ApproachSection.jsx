import React, { useLayoutEffect, useRef } from 'react';
import '../layout/Section.css';
import '../ui/SectionTitle.css';
import './ApproachSection.css';

function getStepNumber(title, fallbackIndex) {
  const match = title.match(/^\s*(\d+)\s*[.)-]?\s*/);

  if (match) {
    return String(match[1]).padStart(2, '0');
  }

  return String(fallbackIndex + 1).padStart(2, '0');
}

function removeStepPrefix(title) {
  return title.replace(/^\s*\d+\s*[.)-]?\s*/, '').trim();
}

export function ApproachSection({ approach }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)) {
      section.classList.add('is-visible');
      return;
    }

    section.classList.add('approach-ready');
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
    <section id="approach" ref={sectionRef} className="section approach-section">
      <div className="container">
        <div className="section-heading">
          <h2 className="approach-enter approach-enter-title">{approach.title}</h2>
        </div>
      <div className="approach-grid">
        {approach.steps.map((step, index) => {
          const stepNumber = getStepNumber(step.title, index);
          const stepTitle = removeStepPrefix(step.title);

          return (
            <article
              key={step.title}
              className={`approach-card approach-enter ${index % 2 ? 'approach-card-offset' : ''}`.trim()}
              style={{ '--approach-delay': `${150 + index * 130}ms` }}
            >
              <div className="approach-card-glow" aria-hidden="true" />
              <div className="approach-card-header">
                <span className="approach-card-step">{stepNumber}</span>
                <span className="approach-card-line" aria-hidden="true" />
              </div>
              <h3>{stepTitle}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
      </div>
    </section>
  );
}
