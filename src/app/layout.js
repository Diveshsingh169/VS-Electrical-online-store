import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import Script from 'next/script';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';
import WhatsAppFloat from '@/components/ui/WhatsAppFloat';
import AOSInit from '@/components/ui/AOSInit';
import { getCategories } from '@/lib/queries';
import { SITE } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'VS Electricals — Fans, Lighting, Switches, Wires & Appliances',
    template: '%s | VS Electricals',
  },
  description: SITE.description,
  keywords: [
    'electrical appliances',
    'ceiling fans',
    'LED lights',
    'modular switches',
    'wires and cables',
    'water heaters',
    'VS Electricals',
  ],
  openGraph: {
    title: 'VS Electricals',
    description: SITE.description,
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0b1f3a',
};

export default async function RootLayout({ children }) {
  const categories = await getCategories();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white font-sans text-brand-900">
        {/* CDN stylesheets for the animation libraries */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" />

        <Navbar categories={categories} />
        <main>{children}</main>
        <Footer categories={categories} />

        <ScrollToTop />
        <WhatsAppFloat />
        <AOSInit />

        {/* CDN animation libraries */}
        <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
