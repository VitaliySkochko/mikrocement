import React from 'react';
import { Section } from '../layout/Section';
import './CoverageSection.css';

export function CoverageSection({ coverage }) {
  return (
    <Section id="coverage" title={coverage.title}>
      <div className="coverage-callout reveal" data-reveal>
        <p>{coverage.text}</p>
      </div>
    </Section>
  );
}
