import React, { useMemo, useState } from 'react';
import './Gallery.css';

export function Gallery({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = items.length;

  const progress = useMemo(() => {
    if (totalItems <= 1) return 100;
    return ((activeIndex + 1) / totalItems) * 100;
  }, [activeIndex, totalItems]);

  const goToSlide = (index) => {
    if (!totalItems) return;
    const safeIndex = (index + totalItems) % totalItems;
    setActiveIndex(safeIndex);
  };

  const handlePrev = () => goToSlide(activeIndex - 1);
  const handleNext = () => goToSlide(activeIndex + 1);

  if (!totalItems) {
    return null;
  }

  return (
    <div className="gallery">
      <div className="gallery-viewport" aria-live="polite">
        <div
          className="gallery-track"
          style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
        >
          {items.map((item, index) => (
            <figure
              className="gallery-slide"
              key={item.image}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={item.image}
                alt={item.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </figure>
          ))}
        </div>

        <div className="gallery-overlay" aria-hidden="true" />

        <button
          type="button"
          className="gallery-control gallery-control-prev"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <span>‹</span>
        </button>

        <button
          type="button"
          className="gallery-control gallery-control-next"
          onClick={handleNext}
          aria-label="Next image"
        >
          <span>›</span>
        </button>
      </div>

      <div className="gallery-footer">
        <div className="gallery-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="gallery-dots" role="tablist" aria-label="Gallery navigation">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              className={`gallery-dot ${index === activeIndex ? 'is-active' : ''}`}
              aria-selected={index === activeIndex}
              aria-label={`Go to image ${index + 1}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}