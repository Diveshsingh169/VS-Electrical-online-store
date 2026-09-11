import { cx } from '@/lib/utils';

const styles = {
  new: 'bg-electric-500 text-white',
  featured: 'bg-accent-400 text-brand-950',
  soft: 'bg-brand-50 text-brand-700',
  outline: 'border border-brand-200 text-brand-600',
  success: 'bg-emerald-500 text-white',
  muted: 'bg-brand-100 text-brand-500',
};

export default function Badge({ variant = 'soft', className, children }) {
  return <span className={cx('badge', styles[variant] || styles.soft, className)}>{children}</span>;
}
