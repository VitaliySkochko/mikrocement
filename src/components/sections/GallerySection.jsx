import React from 'react';
import { Section } from '../layout/Section';
import { Gallery } from './gallery/Gallery';
import './GallerySection.css';

export function GallerySection({ gallery }) {
  return (
    <Section id="gallery" title={gallery.title} intro={gallery.intro}>
      <Gallery items={gallery.items} />
    </Section>
  );
}
