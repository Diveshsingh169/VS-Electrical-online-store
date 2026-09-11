'use client';

import { useMemo, useState } from 'react';
import SafeImage from '@/components/ui/SafeImage';
import { cx } from '@/lib/utils';

/**
 * Product image gallery: large active image + thumbnail rail.
 * Combines the primary image_url with any gallery images, de-duplicated.
 */
export default function ProductGallery({ image, gallery = [], name, iconName = 'bolt' }) {
  const images = useMemo(() => {
    const all = [image, ...(Array.isArray(gallery) ? gallery : [])].filter(Boolean);
    return Array.from(new Set(all));
  }, [image, gallery]);

  const [active, setActive] = useState(0);
  const current = images[active] || image;

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-brand-100 shadow-card">
        {/* key remounts SafeImage on change so its error state resets per image */}
        <SafeImage
          key={active}
          src={current}
          alt={name}
          width={1000}
          iconName={iconName}
          priority
          className="aspect-square"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.slice(0, 8).map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cx(
                'relative overflow-hidden rounded-xl border-2 transition',
                i === active
                  ? 'border-accent-400 ring-2 ring-accent-400/30'
                  : 'border-brand-100 hover:border-brand-300'
              )}
            >
              <SafeImage
                src={img}
                alt={`${name} view ${i + 1}`}
                width={200}
                iconName={iconName}
                className="aspect-square"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
