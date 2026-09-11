import SectionHeading from '@/components/ui/SectionHeading';
import ProductCard from './ProductCard';

export default function RelatedProducts({ products = [] }) {
  if (!products.length) return null;

  return (
    <section className="section border-t border-brand-100 bg-brand-50/60">
      <div className="container-px">
        <SectionHeading
          eyebrow="You may also like"
          title="Related products"
          subtitle="More from the same category, picked to complement your selection."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
