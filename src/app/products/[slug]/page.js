import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/queries';
import { categoryIconName, Icon } from '@/components/ui/icons';
import ProductGallery from '@/components/products/ProductGallery';
import RelatedProducts from '@/components/products/RelatedProducts';
import EnquiryForm from '@/components/forms/EnquiryForm';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import { inr } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.short_description || undefined,
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);
  const price = inr(product.price);
  const iconName = categoryIconName(product.category_icon);
  const specs = product.specifications && typeof product.specifications === 'object'
    ? Object.entries(product.specifications)
    : [];

  return (
    <>
      {/* Breadcrumb */}
      <section className="border-b border-brand-100 bg-brand-50/60">
        <div className="container-px py-5">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-brand-400">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <Icon name="chevronRight" className="h-4 w-4" />
            <Link href="/products" className="hover:text-brand-700">Products</Link>
            <Icon name="chevronRight" className="h-4 w-4" />
            <Link href={`/products?category=${product.category_slug}`} className="hover:text-brand-700">
              {product.category_name}
            </Link>
            <Icon name="chevronRight" className="h-4 w-4" />
            <span className="font-medium text-brand-700 line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main */}
      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-aos="fade-up">
            <ProductGallery
              image={product.image_url}
              gallery={product.gallery}
              name={product.name}
              iconName={iconName}
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="80">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/products?category=${product.category_slug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 hover:bg-brand-100"
              >
                <Icon name={iconName} className="h-3.5 w-3.5" />
                {product.category_name}
              </Link>
              {product.is_new && <Badge variant="new">New</Badge>}
              {product.is_featured && <Badge variant="featured">Featured</Badge>}
            </div>

            <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-900 sm:text-4xl">
              {product.name}
            </h1>

            {product.rating ? (
              <div className="mt-3 flex items-center gap-3">
                <Rating value={product.rating} showValue />
                <span className="text-sm text-brand-400">Verified buyer rating</span>
              </div>
            ) : null}

            <p className="mt-5 text-base leading-relaxed text-brand-600">
              {product.short_description}
            </p>

            {/* Price / stock */}
            <div className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
              <div>
                {price ? (
                  <>
                    <span className="text-xs text-brand-400">Indicative price</span>
                    <p className="font-heading text-3xl font-extrabold text-brand-900">{price}</p>
                  </>
                ) : (
                  <p className="font-heading text-2xl font-bold text-brand-900">Request a quote</p>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                <Icon name="check" className="h-4 w-4" />
                {product.stock_status === 'out_of_stock' ? 'Made to order' : 'In stock'}
              </span>
            </div>

            {/* Features */}
            {Array.isArray(product.features) && product.features.length > 0 && (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-brand-600">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#enquire" className="btn btn-accent">
                Enquire about this product
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/products" className="btn btn-outline">
                <Icon name="arrowLeft" className="h-4 w-4" />
                Back to products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Specs */}
      <section className="border-t border-brand-100 bg-brand-50/60 py-14">
        <div className="container-px grid gap-10 lg:grid-cols-2">
          {product.description && (
            <div data-aos="fade-up">
              <h2 className="font-heading text-2xl font-bold text-brand-900">Product overview</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-brand-600">
                {product.description}
              </p>
            </div>
          )}

          {specs.length > 0 && (
            <div data-aos="fade-up" data-aos-delay="80">
              <h2 className="font-heading text-2xl font-bold text-brand-900">Specifications</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-brand-100 bg-white">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map(([key, value], i) => (
                      <tr key={key} className={i % 2 ? 'bg-brand-50/50' : 'bg-white'}>
                        <th className="w-1/2 px-5 py-3 text-left font-semibold text-brand-700">{key}</th>
                        <td className="px-5 py-3 text-brand-600">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="section scroll-mt-28">
        <div className="container-px grid gap-10 lg:grid-cols-2 lg:items-start">
          <div data-aos="fade-up">
            <span className="eyebrow">
              <Icon name="mail" className="h-3.5 w-3.5" />
              Request a Quote
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-brand-900">
              Interested in the {product.name}?
            </h2>
            <p className="mt-4 max-w-md text-brand-500">
              Share your requirement and our team will get back with pricing, availability and the
              nearest dealer — usually within one business day.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-brand-600">
              {['Genuine products with warranty', 'Dealer & bulk pricing available', 'Expert sizing & installation advice'].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-900 text-accent-400">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 md:p-8" data-aos="fade-up" data-aos-delay="80">
            <EnquiryForm productId={product.id} productName={product.name} />
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />
    </>
  );
}
