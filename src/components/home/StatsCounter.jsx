'use client';

import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/site';
import { cx } from '@/lib/utils';

function useCountUp(target, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    const obj = { v: 0 };
    if (typeof window !== 'undefined' && window.gsap) {
      const tween = window.gsap.to(obj, {
        v: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => setVal(obj.v),
      });
      return () => tween.kill();
    }
    // Fallback: requestAnimationFrame easing
    let raf;
    const start = performance.now();
    const dur = 1800;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return val;
}

function StatItem({ value, suffix, label, run }) {
  const v = useCountUp(value, run);
  const display = value >= 100 ? Math.floor(v).toLocaleString('en-IN') : Math.floor(v);
  return (
    <div className="text-center" data-aos="fade-up">
      <div className="font-heading text-4xl font-extrabold md:text-5xl">
        <span className="gradient-text">
          {display}
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-sm text-white/60">{label}</p>
    </div>
  );
}

export default function StatsCounter({ className }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={cx('relative overflow-hidden bg-brand-950 py-16 md:py-20', className)}>
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-electric-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent-400/10 blur-3xl" />
      <div className="container-px relative grid grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <StatItem key={i} {...s} run={run} />
        ))}
      </div>
    </section>
  );
}
