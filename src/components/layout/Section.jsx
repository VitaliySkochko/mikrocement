import React from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import './Section.css';

export function Section({ id, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="container">
        <SectionTitle title={title} intro={intro} />
        {children}
      </div>
    </section>
  );
}
