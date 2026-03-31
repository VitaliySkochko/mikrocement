import { useEffect } from 'react';

export function useActiveSection(navItems, setActiveSection) {
  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) {
          return;
        }

        setActiveSection(visibleEntries[0].target.id);
      },
      {
        rootMargin: '-32% 0px -48% 0px',
        threshold: [0.2, 0.35, 0.55, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems, setActiveSection]);
}
