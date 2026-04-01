import React from 'react';
import { Section } from '../layout/Section';
import img1 from '../assets/images/gallery2.jpg';
import img2 from '../assets/images/gallery6.jpg';
import img3 from '../assets/images/gallery7.jpg';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {

  const images = [
    { src: img1, alt: 'Microcement interior living room' },
    { src: img2, alt: 'Modern microcement floor interior' },
    { src: img3, alt: 'Luxury microcement wall and floor finish' }
  ];

  const paragraphs = Array.isArray(coverage.paragraphs)
    ? coverage.paragraphs.slice(0, 4)
    : [];

  return (
    <Section id="coverage" title="" intro="" className="coverage-section">
      <div className="coverage-layout">

        <div className="coverage-media reveal" data-reveal="image">
          {images.map((image, index) => (
            <figure
              key={index}
              className={`coverage-photo coverage-photo-${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        <article className="coverage-content reveal" data-reveal="text">
          <h2 className="coverage-article-title">
            {coverage.title}
          </h2>

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