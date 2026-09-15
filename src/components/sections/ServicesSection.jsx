import React, { useLayoutEffect, useRef, useState } from 'react';
import '../layout/Section.css';
import '../ui/SectionTitle.css';
import './ServicesSection.css';
import { trackEvent } from '../../firebase/analytics';

export function ServicesSection({ services }) {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)) {
      section.classList.add('is-visible');
      return;
    }

    section.classList.add('services-ready');
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        section.classList.add('is-visible');
        observer.unobserve(section);
      }
    }, { threshold: 0.01, rootMargin: '0px 0px -15% 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index) => {
    if (openIndex !== index) {
      const service = services.items[index];
      trackEvent('service_opened', {
        service_name: typeof service === 'string' ? service : service.title,
      });
    }
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <section id="services" ref={sectionRef} className="section services-section">
      <div className="container">
        <div className="section-heading">
          <h2 className="services-enter services-enter-heading">{services.title}</h2>
        </div>
      <ul className="service-accordion" role="list">
        {services.items.map((item, index) => {
          const service =
            typeof item === 'string' ? { title: item, text: '' } : item;

          const isOpen = openIndex === index;

          return (
            <li
              key={`${service.title}-${index}`}
              className="services-enter"
              style={{ '--services-delay': `${150 + index * 130}ms` }}
            >
              <div
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
              </div>
            </li>
          );
        })}
      </ul>
      </div>
    </section>
  );
}
