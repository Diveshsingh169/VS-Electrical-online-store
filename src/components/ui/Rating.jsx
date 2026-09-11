import { cx } from '@/lib/utils';
import { Icon } from './icons';

export default function Rating({ value = 0, className, showValue = false, size = 'h-4 w-4' }) {
  const rounded = Math.round(Number(value) || 0);
  return (
    <div className={cx('inline-flex items-center gap-0.5', className)} aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rounded ? 'text-accent-400' : 'text-brand-200'}>
          <Icon name="star" className={size} />
        </span>
      ))}
      {showValue && value ? (
        <span className="ml-1.5 text-xs font-semibold text-brand-500">{Number(value).toFixed(1)}</span>
      ) : null}
    </div>
  );
}
