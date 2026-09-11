import { SITE } from '@/lib/site';
import { Icon } from './icons';

export default function WhatsAppFloat() {
  const number = (SITE.whatsapp || '').replace(/[^0-9]/g, '');
  const href = `https://wa.me/${number}?text=${encodeURIComponent(
    "Hi VS Electricals, I'd like to know more about your products."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <Icon name="whatsapp" className="relative h-7 w-7" />
    </a>
  );
}
