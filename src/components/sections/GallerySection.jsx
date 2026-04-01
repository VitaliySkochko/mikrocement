import React from 'react';
import { Section } from '../layout/Section';
import { Gallery } from './gallery/Gallery';
import img1 from '../assets/images/gallery1.jpg';
import img2 from '../assets/images/gallery2.jpg';
import img3 from '../assets/images/gallery3.jpg';
import img4 from '../assets/images/gallery4.jpg';
import img5 from '../assets/images/gallery5.jpg';
import img6 from '../assets/images/gallery6.jpg';
import img7 from '../assets/images/gallery7.jpg';
import img8 from '../assets/images/gallery8.jpg';
import img9 from '../assets/images/gallery9.jpg';
import img10 from '../assets/images/gallery10.jpg';
import './GallerySection.css';

export function GallerySection({ gallery }) {
  const items = [
    { title: 'Microcement project 1', image: img1 },
    { title: 'Microcement project 2', image: img2 },
    { title: 'Microcement project 3', image: img3 },
    { title: 'Microcement project 4', image: img4 },
    { title: 'Microcement project 5', image: img5 },
    { title: 'Microcement project 6', image: img6 },
    { title: 'Microcement project 7', image: img7 },
    { title: 'Microcement project 8', image: img8 },
    { title: 'Microcement project 9', image: img9 },
    { title: 'Microcement project 10', image: img10 },
  ];

  return (
    <Section id="gallery" title={gallery.title} intro={gallery.intro}>
      <Gallery items={items} />
    </Section>
  );
}