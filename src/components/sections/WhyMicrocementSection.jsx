import React from 'react';
import { Section } from '../layout/Section';
import './WhyMicrocementSection.css';

const icons = [
  (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M9 20.5 24 8l15 12.5v17.8H9z" />
      <path d="M15 22h18" />
      <path d="M15 28h18" />
      <path d="M20 8h8" />
    </svg>
  ),
  (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="14" />
      <path d="m18.5 24 3.6 3.7 7.8-7.9" />
      <path d="M24 10v4" />
      <path d="M24 34v4" />
    </svg>
  ),
  (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="9" y="12" width="30" height="24" rx="6" />
      <path d="M24 12v24" />
      <path d="M9 24h30" />
      <path d="M15 30h7" />
    </svg>
  )
];

export function WhyMicrocementSection({ why }) {
  return (
    <Section id="why" title={why.title} intro={why.intro} className="why-microcement">
      <div className="why-microcement-grid" role="list">
        {why.items.map((item, index) => (
          <article
            key={item.title}
            className="why-microcement-card reveal"
            data-reveal="card"
            data-reveal-group="why-cards"
            role="listitem"
            style={{ '--reveal-delay': '80ms', '--reveal-step': '130ms' }}
          >
            <span className="why-microcement-icon" aria-hidden="true">
              {icons[index % icons.length]}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
