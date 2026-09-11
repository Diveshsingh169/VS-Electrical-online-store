import ProductCard from './ProductCard';
import { Icon } from '@/components/ui/icons';

export default function ProductGrid({ products = [], emptyMessage = 'No products found.' }) {
  if (!products.length) {
    return (
      <div className="col-span-full rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 py-20 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-brand-300 shadow-card">
          <Icon name="search" className="h-7 w-7" />
        </div>
        <p className="mt-4 font-heading text-lg font-semibold text-brand-800">{emptyMessage}</p>
        <p className="mt-1 text-sm text-brand-400">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
