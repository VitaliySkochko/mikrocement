import React from 'react';
import { Section } from '../layout/Section';
import './ServicesSection.css';

export function ServicesSection({ services }) {
  return (
    <Section id="services" title={services.title}>
      <ul className="service-list">
        {services.items.map((item, index) => (
          <li key={item} className="reveal" data-reveal style={{ '--reveal-delay': `${index * 60}ms` }}>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
