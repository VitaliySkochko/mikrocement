import React from 'react';
import { Section } from '../layout/Section';
import { galleryImages } from '../assets/images/responsive';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {
  const images = [
    { ...galleryImages.gallery2, alt: 'Microcement interior living room' },
    { ...galleryImages.gallery6, alt: 'Modern microcement floor interior' },
    { ...galleryImages.gallery7, alt: 'Luxury microcement wall and floor finish' }
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
                srcSet={image.srcSet}
                sizes="(max-width: 640px) 94vw, (max-width: 980px) 720px, 280px"
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
