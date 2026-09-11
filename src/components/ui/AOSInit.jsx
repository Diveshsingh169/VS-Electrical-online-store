'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Initializes AOS (loaded via CDN in the root layout) once it's available,
 * and refreshes it on client-side route changes.
 */
export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    let tries = 0;
    const id = setInterval(() => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({
          duration: 700,
          easing: 'ease-out-cubic',
          once: true,
          offset: 60,
          disable: () =>
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        });
        clearInterval(id);
      } else if (++tries > 50) {
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.refreshHard();
    }
  }, [pathname]);

  return null;
}
