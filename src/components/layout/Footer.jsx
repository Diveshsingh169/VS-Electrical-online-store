import Link from 'next/link';
import { SITE, NAV, FALLBACK_CATEGORIES } from '@/lib/site';
import { Icon } from '@/components/ui/icons';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Footer({ categories = [] }) {
  const cats = (categories.length ? categories : FALLBACK_CATEGORIES).slice(0, 8);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/70">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />

      {/* Newsletter strip */}
      <div className="relative border-b border-white/10">
        <div className="container-px grid gap-6 py-10 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">Stay charged with VS Electricals</h3>
            <p className="mt-2 text-sm text-white/60">
              Product launches, offers and electrical safety tips — straight to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-px relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Icon name="bolt" className="h-6 w-6 text-accent-400" />
            </span>
            <span className="font-heading text-lg font-extrabold text-white">VS Electricals</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{SITE.description}</p>
          <div className="mt-5 flex gap-2">
            {SITE.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/70 ring-1 ring-white/10 transition hover:bg-accent-400 hover:text-brand-950"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="link-underline transition hover:text-white">
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Categories</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="link-underline transition hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <Icon name="location" className="h-5 w-5 shrink-0 text-accent-400" />
              <span>{SITE.address}</span>
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="flex gap-3 transition hover:text-white">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-accent-400" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex gap-3 transition hover:text-white">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-accent-400" />
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="h-5 w-5 shrink-0 text-accent-400" />
              <span>Mon – Sat · 9:30 AM – 7:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {year} VS Electricals Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="#" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition hover:text-white">Terms of Service</Link>
            <Link href="#" className="transition hover:text-white">Warranty</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
