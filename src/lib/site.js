// Static site content & configuration (nav, hero, testimonials, contact).
// Product/category data comes from MySQL; this is the marketing chrome.

export const SITE = {
  name: 'VS Electricals',
  tagline: 'Powering Homes. Trusted for Life.',
  description:
    'Premium fans, LED lighting, switches, wires, water heaters and home appliances — engineered for Indian homes and backed by expert support.',
  phone: process.env.NEXT_PUBLIC_PHONE || '+91 99999 99999',
  email: process.env.NEXT_PUBLIC_EMAIL || 'sales@vselectricals.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '919999999999',
  address: 'VS Electricals Pvt. Ltd., 24 Industrial Estate, Pune, Maharashtra 411001',
  socials: [
    { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
    { icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
    { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
    { icon: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  ],
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Used by the navbar mega-menu / footer if the DB has no categories yet.
export const FALLBACK_CATEGORIES = [
  { name: 'Fans', slug: 'fans', icon: 'fan' },
  { name: 'LED Lighting', slug: 'led-lighting', icon: 'bulb' },
  { name: 'Switches & Sockets', slug: 'switches-sockets', icon: 'switch' },
  { name: 'Wires & Cables', slug: 'wires-cables', icon: 'cable' },
  { name: 'Home Appliances', slug: 'home-appliances', icon: 'appliance' },
  { name: 'Water Heaters', slug: 'water-heaters', icon: 'heater' },
  { name: 'MCBs & Distribution', slug: 'mcb-distribution', icon: 'panel' },
  { name: 'Kitchen Appliances', slug: 'kitchen-appliances', icon: 'kitchen' },
];

export const HERO_SLIDES = [
  {
    eyebrow: 'Premium Electricals',
    title: 'Power Your Home With Confidence',
    subtitle:
      'Energy-efficient fans, lighting and appliances engineered to Indian safety standards — and built to last.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013',
    ctaText: 'Explore Products',
    ctaHref: '/products',
  },
  {
    eyebrow: 'Certified & Safe',
    title: 'Wiring & Protection You Can Trust',
    subtitle:
      'BIS-certified wires, cables, switches and distribution boards for safe, reliable installations.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
    ctaText: 'Shop Wiring',
    ctaHref: '/products?category=wires-cables',
  },
  {
    eyebrow: 'Smart Living',
    title: 'Comfort in Every Corner',
    subtitle:
      'From silent BLDC fans to instant water heaters — upgrade your home with VS Electricals.',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',
    ctaText: 'View Appliances',
    ctaHref: '/products?category=home-appliances',
  },
];

export const FEATURES = [
  {
    icon: 'shield',
    title: '5-Year Warranty',
    text: 'Every product is backed by a comprehensive warranty and genuine spare support.',
  },
  {
    icon: 'bolt',
    title: 'BIS / ISI Certified',
    text: 'Energy-efficient products that meet strict Indian electrical safety standards.',
  },
  {
    icon: 'truck',
    title: 'Pan-India Delivery',
    text: 'Fast, insured shipping to 25,000+ pin codes across the country.',
  },
  {
    icon: 'headset',
    title: 'Expert Support',
    text: 'Talk to real electrical engineers for product sizing, wiring and installation.',
  },
];

export const STATS = [
  { value: 35, suffix: '+', label: 'Years of Trust' },
  { value: 1200, suffix: '+', label: 'Products' },
  { value: 5, suffix: ' Lakh+', label: 'Happy Customers' },
  { value: 800, suffix: '+', label: 'Dealer Network' },
];

export const TESTIMONIALS = [
  {
    name: 'Rahul Deshmukh',
    role: 'Homeowner, Pune',
    rating: 5,
    text: 'Replaced every fan in my house with VS BLDC fans. The electricity bill dropped noticeably and they are whisper-silent.',
  },
  {
    name: 'Sneha Iyer',
    role: 'Interior Designer',
    rating: 5,
    text: 'Their modular switches and LED profiles are my go-to for premium projects. Finish and quality are top-notch.',
  },
  {
    name: 'Amit Contractor',
    role: 'Electrical Contractor, Mumbai',
    rating: 5,
    text: 'I have wired 40+ flats with VS cables and MCBs. Consistent quality and the support team actually knows electricals.',
  },
];
