import { useEffect } from 'react';

export function useRevealOnScroll(lang) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        element.classList.add('is-visible');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -12% 0px'
      }
    );

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [lang]);
}
