import React from 'react';
import { Section } from '../layout/Section';
import './GallerySection.css';

export function GallerySection({ gallery }) {
  return (
    <Section id="gallery" title={gallery.title} intro={gallery.intro}>
      <div className="gallery-grid">
        {gallery.items.map((item, index) => (
          <article key={item.title} className="gallery-card reveal" data-reveal style={{ '--reveal-delay': `${index * 75}ms` }}>
            <div className="gallery-image-wrap">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>
            <div className="gallery-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
