import React from 'react';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';
import './WhyMicrocementSection.css';

export function WhyMicrocementSection({ why }) {
  return (
    <Section id="why" title={why.title} intro={why.intro}>
      <div className="grid grid-3">
        {why.items.map((item, index) => (
          <Card key={item.title} title={item.title} text={item.text} delay={index * 80} />
        ))}
      </div>
    </Section>
  );
}
