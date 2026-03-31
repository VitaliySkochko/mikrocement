import React from 'react';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export function ApproachSection({ approach }) {
  return (
    <Section id="approach" title={approach.title}>
      <div className="grid grid-2">
        {approach.steps.map((step, index) => (
          <Card key={step.title} title={step.title} text={step.text} className={index % 2 ? 'card-offset' : ''} delay={index * 85} />
        ))}
      </div>
    </Section>
  );
}
