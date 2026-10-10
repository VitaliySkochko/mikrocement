import React, { useMemo } from 'react';
import { Section } from '../layout/Section';
import { Gallery } from './gallery/Gallery';


import './GallerySection.css';

const galleryModules = import.meta.glob([
  '../assets/img/*',
  // Keep the PNG originals as sources; load only their optimized WebP versions.
  '!../assets/img/IMG_6269.PNG',
  '!../assets/img/IMG_6270.PNG',
  '!../assets/img/IMG_6274.PNG',
  '!../assets/img/IMG_6275.PNG',
], {
  eager: true,
  import: 'default',
  query: '?url',
});

const imageExtensions = /\.(?:jpe?g|png|webp|avif|gif)$/i;

export function GallerySection({ gallery }) {
  const items = useMemo(
    () => Object.entries(galleryModules)
      .filter(([path]) => imageExtensions.test(path))
      .sort(([first], [second]) => first.localeCompare(second, undefined, { numeric: true }))
      .map(([path, image], index) => ({
        image,
        title: `Realizacja mikrocementu Lux Mikrocement – ${index + 1}`,
        source: path,
      })),
    []
  );

  return (
    <Section
      id="gallery"
      title={gallery?.title || ''}
      intro={gallery?.intro || ''}
    >
      <Gallery items={items} />
    </Section>
  );
}
