import React, { useMemo } from 'react';
import { Section } from '../layout/Section';
import { Gallery } from './gallery/Gallery';


import './GallerySection.css';

// Include approved project photos only. This directory also holds decorative assets.
const galleryModules = import.meta.glob([
  '../assets/img/IMG_6269.webp',
  '../assets/img/IMG_6270.webp',
  '../assets/img/IMG_6274.webp',
  '../assets/img/IMG_6275.webp',
  '../assets/img/photo_2026-09-15_17-11-47.jpg',
  '../assets/img/photo_2026-09-15_17-11-53.jpg',
  '../assets/img/photo_2026-09-15_17-11-55.jpg',
  '../assets/img/photo_2026-09-15_17-11-57.jpg',
  '../assets/img/photo_2026-09-15_17-11-59.jpg',
  '../assets/img/photo_2026-09-15_17-12-00.jpg',
  '../assets/img/photo_2026-09-15_17-12-02.jpg',
  '../assets/img/photo_2026-09-15_17-12-04.jpg',
  '../assets/img/photo_2026-09-15_17-12-06.jpg',
  '../assets/img/photo_2026-09-15_17-12-09.jpg',
  '../assets/img/photo_2026-09-15_17-12-12.jpg',
  '../assets/img/photo_2026-09-15_17-12-15.jpg',
], {
  eager: true,
  import: 'default',
  query: '?url',
});

export function GallerySection({ gallery }) {
  const items = useMemo(
    () => Object.entries(galleryModules)
      .sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))
      .map(([path, image], index) => ({
        image,
        title: `${gallery.imageLabel} – ${index + 1}`,
        source: path,
      })),
    [gallery.imageLabel]
  );

  return (
    <Section
      id="gallery"
      title={gallery?.title || ''}
      intro={gallery?.intro || ''}
    >
      <Gallery items={items} labels={gallery} />
    </Section>
  );
}
