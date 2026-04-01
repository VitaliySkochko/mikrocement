import { useEffect } from 'react';

export function useActiveSection(navItems, setActiveSection) {
  useEffect(() => {
    if (!Array.isArray(navItems) || !navItems.length) {
      return;
    }

    const handleScroll = () => {
      const topbarHeight = document.querySelector('.topbar-wrap')?.offsetHeight ?? 0;
      const offset = topbarHeight + 110;

      let currentSection = navItems[0]?.id || 'hero';

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= offset) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [navItems, setActiveSection]);
}