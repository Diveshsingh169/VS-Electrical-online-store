import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/queries';
import Filters from '@/components/products/Filters';
import ProductGrid from '@/components/products/ProductGrid';
import { Icon } from '@/components/ui/icons';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const q = searchParams?.q;
  const category = searchParams?.category;
  if (q) return { title: `Search: ${q}` };
  if (category) {
    return { title: `${category.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())}` };
  }
  return { title: 'All Products' };
}

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category || '';
  const q = searchParams?.q || '';
  const sort = searchParams?.sort || 'featured';

  const [products, categories] = await Promise.all([
    getProducts({ category, q, sort }),
    getCategories(),
  ]);

  const activeCat = category ? categories.find((c) => c.slug === category) : null;
  const heading = activeCat ? activeCat.name : q ? `Results for “${q}”` : 'All Products';
  const subtitle = activeCat?.description
    ? activeCat.description
    : 'Browse our full range of certified, energy-efficient electricals.';

  return (
    <>
      {/* Page header */}
      <section className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-px py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-sm text-brand-400">
            <Link href="/" className="hover:text-brand-700">
              Home
            </Link>
            <Icon name="chevronRight" className="h-4 w-4" />
            <span className="font-medium text-brand-700">Products</span>
            {activeCat && (
              <>
                <Icon name="chevronRight" className="h-4 w-4" />
                <span className="font-medium text-brand-700">{activeCat.name}</span>
              </>
            )}
          </nav>
          <h1 className="mt-3 font-heading text-3xl font-extrabold text-brand-900 sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-2 max-w-2xl text-brand-500">{subtitle}</p>
        </div>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container-px grid gap-8 lg:grid-cols-[280px_1fr]">
          <Filters
            categories={categories}
            activeCategory={category}
            activeSort={sort}
            query={q}
          />

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-brand-500">
                <span className="font-bold text-brand-900">{products.length}</span>{' '}
                {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <ProductGrid
              products={products}
              emptyMessage={
                q
                  ? `No products match “${q}”.`
                  : 'No products here yet — run the database seed to populate the catalog.'
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}
