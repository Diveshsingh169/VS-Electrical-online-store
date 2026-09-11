import SafeImage from '@/components/ui/SafeImage';
import { Icon } from '@/components/ui/icons';
import { FEATURES } from '@/lib/site';

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow" data-aos="fade-up">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            Why VS Electricals
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl" data-aos="fade-up">
            Built for safety. <span className="gradient-text">Engineered to last.</span>
          </h2>
          <p className="mt-4 max-w-md text-brand-500" data-aos="fade-up">
            We combine rigorous testing, certified materials and real engineering support — so every
            installation is safe, efficient and dependable for years.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                data-aos="fade-up"
                data-aos-delay={(i % 2) * 80}
                className="rounded-2xl border border-brand-100 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent-600">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-500">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-aos="fade-left">
          <SafeImage
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e"
            alt="VS Electricals technician at work"
            width={800}
            className="aspect-[4/5] rounded-3xl"
            iconName="bolt"
          />
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-400/30 to-electric-500/20 blur-2xl" />
          <div className="absolute -bottom-6 left-4 rounded-2xl bg-white p-5 shadow-card-hover md:-left-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-900 text-accent-400">
                <Icon name="award" className="h-6 w-6" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold leading-none">35+</p>
                <p className="mt-1 text-xs text-brand-500">Years of trust</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
