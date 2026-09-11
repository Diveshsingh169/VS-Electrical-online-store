import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import Badge from '@/components/ui/Badge';
import Rating from '@/components/ui/Rating';
import { Icon, categoryIconName } from '@/components/ui/icons';
import { inr } from '@/lib/utils';

export default function ProductCard({ product, index = 0 }) {
  const price = inr(product.price);

  return (
    <Link
      href={`/products/${product.slug}`}
      data-aos="fade-up"
      data-aos-delay={(index % 4) * 60}
      className="group card flex flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div className="relative">
        <SafeImage
          src={product.image_url}
          alt={product.name}
          width={600}
          iconName={categoryIconName(product.category_icon)}
          className="aspect-[4/3]"
          imgClassName="group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_new && <Badge variant="new">New</Badge>}
          {product.is_featured && <Badge variant="featured">Featured</Badge>}
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-brand-600 backdrop-blur">
          {product.category_name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {product.rating ? <Rating value={product.rating} showValue className="mb-2" /> : null}
        <h3 className="font-heading text-base font-bold text-brand-900 transition line-clamp-1 group-hover:text-accent-600">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-brand-500 line-clamp-2">{product.short_description}</p>

        <div className="mt-4 flex items-center justify-between border-t border-brand-100 pt-4">
          <div>
            {price ? (
              <>
                <span className="text-[11px] text-brand-400">Starting at</span>
                <p className="font-heading text-lg font-bold text-brand-900">{price}</p>
              </>
            ) : (
              <span className="text-sm font-semibold text-brand-500">Request a quote</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700 transition group-hover:bg-accent-400 group-hover:text-brand-950">
            Enquire <Icon name="arrowRight" className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
