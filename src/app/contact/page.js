import EnquiryForm from '@/components/forms/EnquiryForm';
import { Icon } from '@/components/ui/icons';
import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with VS Electricals for product enquiries, dealer pricing, bulk orders and expert electrical support.',
};

const CONTACT_CARDS = [
  {
    icon: 'phone',
    label: 'Call us',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    note: 'Mon–Sat, 9:30am – 7:00pm',
  },
  {
    icon: 'mail',
    label: 'Email us',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: 'We reply within one business day',
  },
  {
    icon: 'whatsapp',
    label: 'WhatsApp',
    value: 'Chat with us',
    href: `https://wa.me/${SITE.whatsapp}`,
    note: 'Fastest way to reach our team',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-brand-950 py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-grid opacity-30" />
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-electric-500/10 blur-3xl" />
        <div className="container-px relative max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-400/40 bg-accent-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300">
            <Icon name="headset" className="h-3.5 w-3.5" />
            We&rsquo;re here to help
          </span>
          <h1 className="mt-5 font-heading text-4xl font-extrabold sm:text-5xl">
            Let&rsquo;s talk electricals
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Product questions, dealer pricing or a bulk requirement — send us a note and our team
            will get right back to you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: info */}
          <div>
            <div className="grid gap-4 sm:grid-cols-1">
              {CONTACT_CARDS.map((c, i) => {
                const external = /^https?:\/\//.test(c.href);
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    data-aos="fade-up"
                    data-aos-delay={i * 70}
                    className="card flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent-600">
                      <Icon name={c.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                        {c.label}
                      </p>
                      <p className="font-heading text-lg font-bold text-brand-900">{c.value}</p>
                      <p className="text-xs text-brand-400">{c.note}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Address */}
            <div className="card mt-4 p-5" data-aos="fade-up">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-900 text-accent-400">
                  <Icon name="location" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                    Head Office
                  </p>
                  <p className="mt-1 leading-relaxed text-brand-700">{SITE.address}</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-brand-700">Follow us</p>
              <div className="mt-3 flex gap-3">
                {SITE.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-brand-200 bg-white text-brand-600 transition hover:-translate-y-0.5 hover:border-accent-400 hover:text-accent-600"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="card p-6 md:p-8" data-aos="fade-up" data-aos-delay="80">
            <h2 className="font-heading text-2xl font-bold text-brand-900">Send us an enquiry</h2>
            <p className="mt-1.5 text-sm text-brand-500">
              Fill in the form and we&rsquo;ll respond with pricing and availability.
            </p>
            <div className="mt-6">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
