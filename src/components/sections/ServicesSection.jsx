import React, { useState } from 'react';
import { Section } from '../layout/Section';
import './ServicesSection.css';

export function ServicesSection({ services }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <Section id="services" title={services.title}>
      <ul className="service-accordion" role="list">
        {services.items.map((item, index) => {
          const service =
            typeof item === 'string' ? { title: item, text: '' } : item;

          const isOpen = openIndex === index;

          return (
            <li
              key={`${service.title}-${index}`}
              className={`service-accordion__item ${isOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="service-accordion__trigger"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={`service-panel-${index}`}
              >
                <span className="service-accordion__heading-wrap">
                  <span className="service-accordion__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="service-accordion__title">{service.title}</span>
                </span>

                <span
                  className={`service-accordion__icon ${isOpen ? 'is-open' : ''}`}
                  aria-hidden="true"
                >
                  <span className="service-accordion__icon-line service-accordion__icon-line--h" />
                  <span className="service-accordion__icon-line service-accordion__icon-line--v" />
                </span>
              </button>

              <div
                id={`service-panel-${index}`}
                className={`service-accordion__body ${isOpen ? 'is-open' : ''}`}
              >
                <div className="service-accordion__body-inner">
                  {service.text ? <p>{service.text}</p> : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}