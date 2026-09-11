import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import SectionHeading from '@/components/ui/SectionHeading';
import { Icon, categoryIconName } from '@/components/ui/icons';
import { FALLBACK_CATEGORIES } from '@/lib/site';

export default function FeaturedCategories({ categories = [] }) {
  const cats = (categories.length ? categories : FALLBACK_CATEGORIES).slice(0, 8);

  return (
    <section className="section">
      <div className="container-px">
        <SectionHeading
          center
          eyebrow="Shop by Category"
          title="Everything electrical, under one roof"
          subtitle="From energy-saving fans to certified wiring — explore our complete range of home and industrial electricals."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map((c, i) => (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 60}
              className="group relative overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <SafeImage
                src={c.image_url}
                alt={c.name}
                width={400}
                iconName={categoryIconName(c.icon)}
                className="aspect-[4/3]"
                imgClassName="group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-400 text-brand-950 shadow-glow transition group-hover:scale-110">
                  <Icon name={categoryIconName(c.icon)} className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-heading text-base font-bold text-white">{c.name}</h3>
                {c.product_count ? <p className="text-xs text-white/70">{c.product_count} products</p> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
