'use client';

import { useState } from 'react';
import { cx, unsplash } from '@/lib/utils';
import { Icon } from './icons';

/**
 * Image with a graceful branded fallback. The parent controls size/aspect ratio
 * (e.g. className="aspect-square"); the image and fallback fill it absolutely.
 */
export default function SafeImage({
  src,
  alt = '',
  width = 800,
  className,
  imgClassName,
  iconName = 'bolt',
  priority = false,
}) {
  const [failed, setFailed] = useState(false);
  const resolved = unsplash(src, width);

  return (
    <div className={cx('relative overflow-hidden bg-brand-50', className)}>
      {/* Branded backdrop / fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-800 via-brand-700 to-electric-700">
        <Icon name={iconName} className="h-1/4 w-1/4 max-h-16 max-w-[4rem] text-accent-400/60" />
      </div>

      {resolved && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-transform duration-700',
            imgClassName
          )}
        />
      )}
    </div>
  );
}
