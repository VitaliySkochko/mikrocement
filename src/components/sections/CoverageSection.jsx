import React from 'react';
import { Section } from '../layout/Section';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {
  const featuredImages = coverage.images.slice(0, 2);

  return (
    <Section
      id="coverage"
      title={coverage.title}
      intro={coverage.intro}
      className="coverage-section"
    >
      <div className="coverage-layout">
        <div
          className="coverage-media reveal"
          data-reveal="image"
          data-reveal-group="coverage-images"
          style={{ '--reveal-delay': '220ms', '--reveal-step': '120ms' }}
        >
          {featuredImages.map((image, index) => (
            <figure
              key={image.src}
              className="coverage-photo"
              style={{ '--reveal-delay': `${180 + index * 90}ms` }}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </figure>
          ))}
        </div>

        <article className="coverage-content reveal" data-reveal="text">
          <h3 className="coverage-article-title">{coverage.title}</h3>
          <div className="coverage-paragraphs">
            {coverage.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
