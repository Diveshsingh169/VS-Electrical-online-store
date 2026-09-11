import Link from 'next/link';
import { Icon } from '@/components/ui/icons';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-px flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-brand-900 text-accent-400">
          <Icon name="bolt" className="h-10 w-10" />
        </div>
        <p className="mt-6 font-heading text-6xl font-extrabold text-brand-900">404</p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-brand-800">
          This page tripped a fuse
        </h1>
        <p className="mt-3 max-w-md text-brand-500">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved. Let&rsquo;s
          get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Icon name="arrowLeft" className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/products" className="btn btn-outline">
            Browse products
          </Link>
        </div>
      </div>
    </section>
  );
}
