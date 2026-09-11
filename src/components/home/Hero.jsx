'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HERO_SLIDES } from '@/lib/site';
import { unsplash } from '@/lib/utils';
import { Icon } from '@/components/ui/icons';

export default function Hero() {
  const ref = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    let tries = 0;
    const id = setInterval(() => {
      if (typeof window !== 'undefined' && window.Swiper && ref.current) {
        instance.current = new window.Swiper(ref.current, {
          loop: true,
          speed: 900,
          autoplay: { delay: 5500, disableOnInteraction: false },
          effect: 'fade',
          fadeEffect: { crossFade: true },
          pagination: { el: ref.current.querySelector('.hero-pagination'), clickable: true },
          navigation: {
            nextEl: ref.current.querySelector('.hero-next'),
            prevEl: ref.current.querySelector('.hero-prev'),
          },
        });
        clearInterval(id);
      } else if (++tries > 60) {
        clearInterval(id);
      }
    }, 100);
    return () => {
      clearInterval(id);
      if (instance.current && instance.current.destroy) instance.current.destroy(true, true);
    };
  }, []);

  return (
    <section className="relative bg-brand-950">
      <div ref={ref} className="swiper hero-swiper overflow-hidden">
        <div className="swiper-wrapper">
          {HERO_SLIDES.map((slide, i) => (
            <div key={i} className="swiper-slide relative">
              <img
                src={unsplash(slide.image, 1600)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-900/40" />
              <div className="absolute inset-0 bg-hero-grid bg-grid opacity-40" />
              <div className="container-px relative flex min-h-[540px] items-center py-20 md:min-h-[640px]">
                <div className="max-w-xl text-white">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300">
                    <Icon name="sparkles" className="h-3.5 w-3.5" />
                    {slide.eyebrow}
                  </span>
                  <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-lg text-base text-white/70 sm:text-lg">{slide.subtitle}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={slide.ctaHref} className="btn btn-accent">
                      {slide.ctaText}
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                    <Link href="/contact" className="btn btn-outline border-white/25 bg-white/5 text-white hover:border-white hover:bg-white/10">
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="hero-pagination absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2" />
        <button
          type="button"
          aria-label="Previous slide"
          className="hero-prev absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 md:grid"
        >
          <Icon name="arrowLeft" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="hero-next absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 md:grid"
        >
          <Icon name="arrowRight" className="h-5 w-5" />
        </button>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10 bg-brand-950">
        <div className="container-px grid grid-cols-2 gap-4 py-5 text-white/70 sm:grid-cols-4">
          {[
            { icon: 'shield', text: '5-Year Warranty' },
            { icon: 'bolt', text: 'BIS / ISI Certified' },
            { icon: 'truck', text: 'Pan-India Delivery' },
            { icon: 'headset', text: 'Expert Support' },
          ].map((f) => (
            <div key={f.text} className="flex items-center justify-center gap-2 text-sm font-medium sm:justify-start">
              <Icon name={f.icon} className="h-5 w-5 text-accent-400" />
              {f.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
