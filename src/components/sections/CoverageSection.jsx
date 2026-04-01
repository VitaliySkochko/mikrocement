import React from 'react';
import { Section } from '../layout/Section';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {
  return (
    <Section
      id="coverage"
      title={coverage.title}
      intro={coverage.intro}
      className="coverage-section"
    >
      <div className="coverage-layout">
        <article className="coverage-content reveal" data-reveal>
          <p className="coverage-eyebrow">{coverage.eyebrow}</p>
          <p className="coverage-lead">{coverage.lead}</p>

          <ul className="coverage-highlights" aria-label={coverage.highlightsLabel}>
            {coverage.highlights.map((item, index) => (
              <li
                key={item}
                className="reveal"
                data-reveal
                style={{ '--reveal-delay': `${120 + index * 80}ms` }}
              >
                <span className="coverage-dot" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="coverage-media reveal" data-reveal style={{ '--reveal-delay': '110ms' }}>
          {coverage.images.map((image, index) => (
            <figure
              key={image.src}
              className={`coverage-photo coverage-photo-${index + 1}`}
              style={{ '--reveal-delay': `${180 + index * 90}ms` }}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
