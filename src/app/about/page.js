import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import SectionHeading from '@/components/ui/SectionHeading';
import StatsCounter from '@/components/home/StatsCounter';
import CtaSection from '@/components/home/CtaSection';
import { Icon } from '@/components/ui/icons';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'About Us',
  description:
    'For over 35 years, VS Electricals has powered Indian homes with safe, energy-efficient and certified electrical products.',
};

const VALUES = [
  {
    icon: 'shield',
    title: 'Safety First',
    text: 'Every product is tested to BIS/ISI standards. We never compromise on the safety of your home or workplace.',
  },
  {
    icon: 'bolt',
    title: 'Energy Efficient',
    text: 'From BLDC fans to LED lighting, our range is engineered to cut power bills without cutting performance.',
  },
  {
    icon: 'award',
    title: 'Built to Last',
    text: 'Premium materials and rigorous QA mean products that keep performing, year after year.',
  },
  {
    icon: 'headset',
    title: 'People-First Support',
    text: 'Real electrical engineers on call for sizing, wiring and after-sales — not a scripted call centre.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-950 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-grid opacity-30" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 animate-float rounded-full bg-accent-400/10 blur-3xl" />
        <div className="container-px relative max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            About VS Electricals
          </span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
            Powering Indian homes for over{' '}
            <span className="gradient-text">three decades</span>
          </h1>
          <p className="mt-5 text-lg text-white/70">
            What began as a small switchgear workshop is today a trusted name in fans, lighting,
            wiring and appliances — chosen by over 5 lakh homes and 800+ dealers across India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative" data-aos="fade-right">
            <SafeImage
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
              alt="VS Electricals manufacturing"
              width={800}
              className="aspect-[4/3] rounded-3xl"
              iconName="bolt"
            />
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-electric-500/20 to-accent-400/20 blur-2xl" />
          </div>
          <div data-aos="fade-left">
            <SectionHeading
              eyebrow="Our Story"
              title="Engineering trust into every connection"
              subtitle="We exist to make electricity safer, more efficient and more accessible for every Indian home and business."
            />
            <p className="mt-5 leading-relaxed text-brand-600">
              From our first ISI-marked switch to today&rsquo;s silent BLDC fans and smart lighting,
              our obsession has never changed: build products people can trust for a lifetime. Every
              item is tested in-house, backed by genuine warranty and supported by engineers who
              actually understand electricals.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary">
                Explore our range
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Values */}
      <section className="section">
        <div className="container-px">
          <SectionHeading
            center
            eyebrow="What we stand for"
            title="Values that keep the lights on"
            subtitle="The principles behind every product we make and every relationship we build."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 70}
                className="card p-6 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-900 text-accent-400">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-brand-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
