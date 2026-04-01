import React from 'react';
import { Section } from '../layout/Section';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {
  const images = Array.isArray(coverage.images) ? coverage.images.slice(0, 2) : [];
  const paragraphs = Array.isArray(coverage.paragraphs) ? coverage.paragraphs.slice(0, 2) : [];

  return (
    <Section
      id="coverage"
      title=""
      intro=""
      className="coverage-section"
    >
      <div className="coverage-layout">
        <div
          className="coverage-media reveal"
          data-reveal="image"
          data-reveal-group="coverage-images"
          style={{ '--reveal-delay': '220ms', '--reveal-step': '120ms' }}
        >
          {images.map((image, index) => (
            <figure
              key={image.src || index}
              className={`coverage-photo coverage-photo-${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt || coverage.title || 'Coverage image'}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <article className="coverage-content reveal" data-reveal="text">
          <h2 className="coverage-article-title">{coverage.title}</h2>

          <div className="coverage-paragraphs">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
