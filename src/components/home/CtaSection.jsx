import Link from 'next/link';
import { Icon } from '@/components/ui/icons';
import { SITE } from '@/lib/site';

export default function CtaSection() {
  return (
    <section className="section">
      <div className="container-px">
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-electric-800 px-6 py-14 md:px-14"
          data-aos="fade-up"
        >
          <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-grid opacity-20" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-float rounded-full bg-accent-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-electric-500/20 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="eyebrow border-white/20 bg-white/10 text-accent-300">
                <Icon name="bolt" className="h-3.5 w-3.5" />
                Let&rsquo;s build together
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Planning a project or a bulk order?
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Get expert product selection, dealer pricing and fast delivery. Tell us what you
                need and we&rsquo;ll send a tailored quote — usually within one business day.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 md:items-end">
              <Link href="/contact" className="btn btn-accent">
                Request a Quote
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-white/80 transition hover:text-white"
              >
                <Icon name="phone" className="h-5 w-5 text-accent-400" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
