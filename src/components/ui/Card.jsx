import React from 'react';
import './Card.css';

export function Card({ title, text, className = '', delay = 0 }) {
  return (
    <article className={`card reveal ${className}`.trim()} data-reveal style={{ '--reveal-delay': `${delay}ms` }}>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
