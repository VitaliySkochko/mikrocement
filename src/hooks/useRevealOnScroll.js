import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';

function applyStaggerMetadata(elements) {
  const groups = new Map();

  elements.forEach((element) => {
    const groupName = element.dataset.revealGroup;
    if (!groupName) {
      return;
    }

    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }

    groups.get(groupName).push(element);
  });

  groups.forEach((groupItems) => {
    groupItems.forEach((item, index) => {
      if (!item.style.getPropertyValue('--reveal-order')) {
        item.style.setProperty('--reveal-order', String(index));
      }
    });
  });
}

export function useRevealOnScroll(lang) {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    applyStaggerMetadata(revealElements);

    if (reduceMotion) {
      revealElements.forEach((element) => {
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
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [lang]);
}
