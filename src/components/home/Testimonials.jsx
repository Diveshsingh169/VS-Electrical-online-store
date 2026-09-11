import SectionHeading from '@/components/ui/SectionHeading';
import Rating from '@/components/ui/Rating';
import { Icon } from '@/components/ui/icons';
import { TESTIMONIALS } from '@/lib/site';

export default function Testimonials() {
  return (
    <section className="section bg-brand-50/60">
      <div className="container-px">
        <SectionHeading
          center
          eyebrow="Testimonials"
          title="Trusted by 5 lakh+ homes & pros"
          subtitle="Real feedback from homeowners, designers and contractors across India."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="card flex flex-col p-6 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <Icon name="quote" className="h-9 w-9 text-accent-400" />
              <Rating value={t.rating} className="mt-3" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brand-600">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-100 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-900 font-heading text-lg font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold text-brand-900">{t.name}</span>
                  <span className="block text-xs text-brand-400">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
