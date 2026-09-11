'use client';

import { useCallback, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Icon, categoryIconName } from '@/components/ui/icons';
import { cx } from '@/lib/utils';
import { FALLBACK_CATEGORIES } from '@/lib/site';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export default function Filters({
  categories = [],
  activeCategory = '',
  activeSort = 'featured',
  query = '',
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(query);
  const [open, setOpen] = useState(false);

  const cats = categories.length ? categories : FALLBACK_CATEGORIES;

  const push = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const onSearch = (e) => {
    e.preventDefault();
    push({ q: term.trim() || undefined });
    setOpen(false);
  };

  const hasFilters = Boolean(activeCategory || query || (activeSort && activeSort !== 'featured'));

  return (
    <aside className="lg:sticky lg:top-28">
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm font-semibold text-brand-800 shadow-sm lg:hidden"
      >
        <span className="inline-flex items-center gap-2">
          <Icon name="filter" className="h-4 w-4" />
          Filters &amp; Sort
        </span>
        <Icon name="chevronDown" className={cx('h-4 w-4 transition', open && 'rotate-180')} />
      </button>

      <div className={cx('space-y-6', open ? 'block' : 'hidden lg:block')}>
        {/* Search */}
        <form onSubmit={onSearch} className="card p-5">
          <label className="label" htmlFor="filter-search">
            Search products
          </label>
          <div className="relative">
            <input
              id="filter-search"
              type="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Fan, LED, switch…"
              className="field pr-11"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg bg-brand-900 text-white transition hover:bg-accent-400 hover:text-brand-950"
            >
              <Icon name="search" className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Sort */}
        <div className="card p-5">
          <span className="label">Sort by</span>
          <div className="relative">
            <select
              value={activeSort || 'featured'}
              onChange={(e) => push({ sort: e.target.value === 'featured' ? undefined : e.target.value })}
              className="field appearance-none pr-10"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <Icon
              name="chevronDown"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="card p-5">
          <span className="label">Categories</span>
          <ul className="mt-1 space-y-1">
            <li>
              <button
                type="button"
                onClick={() => push({ category: undefined })}
                className={cx(
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                  !activeCategory
                    ? 'bg-brand-900 text-white'
                    : 'text-brand-600 hover:bg-brand-50'
                )}
              >
                <Icon name="sparkles" className="h-4 w-4" />
                All Products
              </button>
            </li>
            {cats.map((c) => {
              const isActive = activeCategory === c.slug;
              return (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => push({ category: c.slug })}
                    className={cx(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                      isActive ? 'bg-brand-900 text-white' : 'text-brand-600 hover:bg-brand-50'
                    )}
                  >
                    <Icon name={categoryIconName(c.icon)} className="h-4 w-4" />
                    <span className="flex-1">{c.name}</span>
                    {c.product_count ? (
                      <span
                        className={cx(
                          'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                          isActive ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-400'
                        )}
                      >
                        {c.product_count}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setTerm('');
              router.push(pathname, { scroll: false });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            <Icon name="close" className="h-4 w-4" />
            Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
}
