import React from 'react';
import { Section } from '../layout/Section';
import image01 from '../assets/images/01.webp';
import image02 from '../assets/images/02.webp';
import image03 from '../assets/images/03.webp';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {
  const images = [
    { src: image01, width: 1440, height: 810, alt: 'Kuchnia i jadalnia z podłogą i ścianami z mikrocementu' },
    { src: image02, width: 1440, height: 810, alt: 'Sypialnia ze ścianą i podłogą z mikrocementu' },
    { src: image03, width: 1440, height: 810, alt: 'Salon z mikrocementem na ścianach i podłodze' }
  ];

  const paragraphs = Array.isArray(coverage?.paragraphs)
    ? coverage.paragraphs.slice(0, 4)
    : [];

  return (
    <Section id="coverage" title="" intro="" className="coverage-section">
      <div className="coverage-layout">
        <div
          className="coverage-media reveal"
          data-reveal="coverage-media"
        >
          {images.map((image, index) => (
            <figure
              key={index}
              className={`coverage-photo coverage-photo-${index + 1}`}
              style={{ '--coverage-delay': `${index * 190}ms` }}
            >
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <article
          className="coverage-content reveal"
          data-reveal="coverage-content"
        >
          <h2 className="coverage-article-title">
            {coverage?.title || ''}
          </h2>

          <div className="coverage-paragraphs">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{ '--coverage-text-delay': `${230 + index * 130}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </Section>
  );
}
