import Link from 'next/link';
import { cx } from '@/lib/utils';
import { Icon } from './icons';

const variants = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  white: 'btn-white',
};

export default function Button({
  href,
  variant = 'primary',
  className,
  children,
  icon,
  iconRight,
  ...props
}) {
  const cls = cx('btn', variants[variant] || variants.primary, className);
  const content = (
    <>
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
      {iconRight && <Icon name={iconRight} className="h-4 w-4" />}
    </>
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noreferrer" {...props}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {content}
    </button>
  );
}
