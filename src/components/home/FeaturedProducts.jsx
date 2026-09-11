import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from '@/components/products/ProductGrid';
import { Icon } from '@/components/ui/icons';

export default function FeaturedProducts({ products = [] }) {
  return (
    <section className="section bg-brand-50/60">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Bestsellers"
            title="Featured products"
            subtitle="Handpicked favourites loved by homeowners and contractors alike."
            className="max-w-xl"
          />
          <Link href="/products" className="btn btn-outline shrink-0" data-aos="fade-up">
            View all products
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12">
          <ProductGrid
            products={products}
            emptyMessage="Featured products will appear here once the database is seeded."
          />
        </div>
      </div>
    </section>
  );
}
