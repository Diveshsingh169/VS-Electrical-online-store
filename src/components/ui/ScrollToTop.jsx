'use client';

import { useEffect, useState } from 'react';
import { cx } from '@/lib/utils';
import { Icon } from './icons';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={cx(
        'fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-brand-900 text-white shadow-card-hover transition-all duration-300 hover:bg-brand-800',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      )}
    >
      <Icon name="arrowUp" className="h-5 w-5" />
    </button>
  );
}
