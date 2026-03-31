import React from 'react';
import { Section } from '../layout/Section';
import './ApproachSection.css';

function getStepNumber(title, fallbackIndex) {
  const match = title.match(/^\s*(\d+)\s*[.)-]?\s*/);

  if (match) {
    return String(match[1]).padStart(2, '0');
  }

  return String(fallbackIndex + 1).padStart(2, '0');
}

function removeStepPrefix(title) {
  return title.replace(/^\s*\d+\s*[.)-]?\s*/, '').trim();
}

export function ApproachSection({ approach }) {
  return (
    <Section id="approach" title={approach.title} className="approach-section">
      <div className="approach-grid">
        {approach.steps.map((step, index) => {
          const stepNumber = getStepNumber(step.title, index);
          const stepTitle = removeStepPrefix(step.title);

          return (
            <article
              key={step.title}
              className={`approach-card reveal ${index % 2 ? 'approach-card-offset' : ''}`.trim()}
              data-reveal
              style={{ '--reveal-delay': `${index * 95}ms` }}
            >
              <div className="approach-card-glow" aria-hidden="true" />
              <div className="approach-card-header">
                <span className="approach-card-step">{stepNumber}</span>
                <span className="approach-card-line" aria-hidden="true" />
              </div>
              <h3>{stepTitle}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
