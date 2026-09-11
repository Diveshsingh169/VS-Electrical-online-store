'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NAV, FALLBACK_CATEGORIES, SITE } from '@/lib/site';
import { cx } from '@/lib/utils';
import { Icon, categoryIconName } from '@/components/ui/icons';

export default function Navbar({ categories = [] }) {
  const cats = categories.length ? categories : FALLBACK_CATEGORIES;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden bg-brand-950 text-white/80 md:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-1.5 hover:text-accent-400">
              <Icon name="phone" className="h-3.5 w-3.5" /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-accent-400">
              <Icon name="mail" className="h-3.5 w-3.5" /> {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60">Genuine products · BIS certified · Pan-India delivery</span>
            <span className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              {SITE.socials.slice(0, 4).map((s) => (
                <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-accent-400">
                  <Icon name={s.icon} className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cx(
          'border-b border-brand-100/70 bg-white/90 backdrop-blur transition-all duration-300',
          scrolled ? 'shadow-card' : ''
        )}
      >
        <nav className="container-px flex items-center justify-between gap-4" aria-label="Primary">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 py-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-900 shadow-glow">
              <Icon name="bolt" className="h-6 w-6 text-accent-400" />
            </span>
            <span className="leading-none">
              <span className="block font-heading text-lg font-extrabold text-brand-900">VS Electricals</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-accent-500">
                Power · Trust · Quality
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              item.label === 'Products' ? (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cx(
                      'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition',
                      isActive(item.href) ? 'text-accent-600' : 'text-brand-700 hover:text-brand-900'
                    )}
                  >
                    {item.label}
                    <Icon name="chevronDown" className="h-4 w-4 transition group-hover:rotate-180" />
                  </Link>
                  {/* Mega menu */}
                  <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-brand-100 bg-white p-4 shadow-card-hover">
                      <div className="grid grid-cols-2 gap-1.5">
                        {cats.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/products?category=${c.slug}`}
                            className="group/item flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-brand-50"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600 transition group-hover/item:bg-accent-400 group-hover/item:text-brand-950">
                              <Icon name={categoryIconName(c.icon)} className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-brand-800">{c.name}</span>
                              {c.product_count ? (
                                <span className="block text-xs text-brand-400">{c.product_count} products</span>
                              ) : null}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/products"
                        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-900 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
                      >
                        View all products <Icon name="arrowRight" className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx(
                      'rounded-full px-4 py-2 text-sm font-semibold transition',
                      isActive(item.href) ? 'text-accent-600' : 'text-brand-700 hover:text-brand-900'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full text-brand-700 transition hover:bg-brand-50"
            >
              <Icon name={searchOpen ? 'close' : 'search'} className="h-5 w-5" />
            </button>
            <Link href="/contact" className="btn btn-accent hidden h-10 px-5 py-0 sm:inline-flex">
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-brand-800 transition hover:bg-brand-50 lg:hidden"
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* Search dropdown */}
        <div
          className={cx(
            'overflow-hidden border-t border-brand-100 bg-white transition-all duration-300',
            searchOpen ? 'max-h-24' : 'max-h-0 border-t-0'
          )}
        >
          <form onSubmit={submitSearch} className="container-px flex items-center gap-3 py-3">
            <Icon name="search" className="h-5 w-5 text-brand-400" />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fans, bulbs, wires, switches…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-brand-300"
            />
            <button type="submit" className="btn btn-primary h-9 px-4 py-0 text-xs">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cx(
          'fixed inset-0 z-50 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div
          className={cx('absolute inset-0 bg-brand-950/50 transition-opacity', mobileOpen ? 'opacity-100' : 'opacity-0')}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cx(
            'absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
            <span className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-900">
                <Icon name="bolt" className="h-5 w-5 text-accent-400" />
              </span>
              <span className="font-heading text-base font-extrabold">VS Electricals</span>
            </span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full hover:bg-brand-50">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={submitSearch} className="flex items-center gap-2 border-b border-brand-100 px-5 py-3">
            <Icon name="search" className="h-4 w-4 text-brand-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-brand-300"
            />
          </form>

          <div className="flex-1 overflow-y-auto px-3 py-3">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx(
                      'block rounded-xl px-4 py-3 text-sm font-semibold transition',
                      isActive(item.href) ? 'bg-brand-50 text-accent-600' : 'text-brand-800 hover:bg-brand-50'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-brand-400">
              Categories
            </p>
            <ul className="grid grid-cols-2 gap-1.5">
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products?category=${c.slug}`}
                    className="flex items-center gap-2 rounded-xl border border-brand-100 p-2.5 text-xs font-medium text-brand-700 transition hover:border-accent-300 hover:bg-accent-50"
                  >
                    <Icon name={categoryIconName(c.icon)} className="h-4 w-4 text-accent-600" />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-brand-100 p-4">
            <Link href="/contact" className="btn btn-accent w-full">
              Get a Quote
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
