import { cx } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
  className,
}) {
  return (
    <div className={cx(center && 'mx-auto text-center', 'max-w-2xl', center && 'mx-auto', className)}>
      {eyebrow && (
        <span className="eyebrow" data-aos="fade-up">
          {eyebrow}
        </span>
      )}
      <h2
        className={cx(
          'mt-4 text-3xl font-bold sm:text-4xl md:text-[2.6rem] md:leading-[1.1]',
          light ? 'text-white' : 'text-brand-900'
        )}
        data-aos="fade-up"
        data-aos-delay="50"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cx('mt-4 text-base leading-relaxed sm:text-lg', light ? 'text-white/70' : 'text-brand-500')}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
