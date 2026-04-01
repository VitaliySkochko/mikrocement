import React from 'react';
import './SectionTitle.css';

export function SectionTitle({ title, intro }) {
  return (
    <div className="section-heading reveal" data-reveal="heading">
      <h2>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
