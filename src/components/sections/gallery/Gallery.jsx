import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '../../../firebase/analytics';
import './Gallery.css';

export function Gallery({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
  const totalItems = items.length;

  const progress = useMemo(() => {
    if (totalItems <= 1) return 100;
    return ((activeIndex + 1) / totalItems) * 100;
  }, [activeIndex, totalItems]);

  const goToSlide = useCallback(
    (index, direction = null) => {
      if (!totalItems) return;
      setActiveIndex((index + totalItems) % totalItems);
      if (direction === 'next') trackEvent('gallery_next');
      if (direction === 'previous') trackEvent('gallery_previous');
    },
    [totalItems]
  );

  const handlePrev = useCallback(() => {
    goToSlide(activeIndex - 1, 'previous');
  }, [activeIndex, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(activeIndex + 1, 'next');
  }, [activeIndex, goToSlide]);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const active = document.activeElement;
      const inViewport = gallery.getBoundingClientRect().top < window.innerHeight &&
        gallery.getBoundingClientRect().bottom > 0;
      if (!inViewport && !gallery.contains(active)) return;
      event.preventDefault();
      event.key === 'ArrowLeft' ? handlePrev() : handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  const touchStart = useRef(null);

  if (!totalItems) return null;

  return (
    <div className="gallery" ref={galleryRef} tabIndex="0" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
      if (touchStart.current == null) return;
      const distance = event.changedTouches[0].clientX - touchStart.current;
      touchStart.current = null;
      if (Math.abs(distance) < 45) return;
      distance < 0 ? handleNext() : handlePrev();
    }}>
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
                    srcSet={item.srcSet}
                    sizes="(max-width: 768px) 180vw, (max-width: 1283px) 92vw, 1180px"
                    width={item.width}
                    height={item.height}
                    alt={item.title}
                    loading={isActive ? 'eager' : 'lazy'}
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
          aria-label="Poprzednie zdjęcie"
        >
          <span>‹</span>
        </button>

        <button
          type="button"
          className="gallery-control gallery-control-next"
          onClick={handleNext}
          aria-label="Następne zdjęcie"
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
              aria-label={`Przejdź do zdjęcia ${index + 1}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
