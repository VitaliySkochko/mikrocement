import React, { useCallback, useMemo, useState } from 'react';
import './Gallery.css';

export function Gallery({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = items.length;

  const progress = useMemo(() => {
    if (totalItems <= 1) return 100;
    return ((activeIndex + 1) / totalItems) * 100;
  }, [activeIndex, totalItems]);

  const goToSlide = useCallback(
    (index) => {
      if (!totalItems) return;
      setActiveIndex((index + totalItems) % totalItems);
    },
    [totalItems]
  );

  const handlePrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  if (!totalItems) return null;

  return (
    <div className="gallery">
      <div className="gallery-viewport" aria-live="polite">
        <div className="gallery-track">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === (activeIndex - 1 + totalItems) % totalItems;
            const isNext = index === (activeIndex + 1) % totalItems;
            const shouldRenderImage = isActive || isPrev || isNext;

            return (
              <figure
                className={`gallery-slide ${isActive ? 'is-active' : ''}`}
                key={item.image}
                aria-hidden={!isActive}
              >
                {shouldRenderImage && (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading={isActive ? 'eager' : 'lazy'}
                    fetchPriority={isActive ? 'high' : 'auto'}
                    decoding="async"
                  />
                )}
              </figure>
            );
          })}
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