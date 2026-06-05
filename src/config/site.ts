export const siteConfig = {
  name: 'Craftisle PDF',
  description: 'Free online PDF tools by Craftisle. Merge, split, compress, and convert PDF files. All processing happens in your browser for maximum privacy.',
  // Force production URL — do NOT use env var in production build
  url: (() => {
    const envUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    // Never allow localhost in production
    if (process.env.NODE_ENV === 'production' && envUrl.includes('localhost')) {
      console.error(
        '[siteConfig] WARNING: NEXT_PUBLIC_APP_URL contains localhost in production build! ' +
        'Falling back to https://pdf.craftisle.com'
      );
      return 'https://pdf.craftisle.com';
    }
    return envUrl || 'https://pdf.craftisle.com';
  })(),
  ogImage: 'https://pdf.craftisle.com/images/og-image.png', // Always absolute URL
  links: {
    github: 'https://github.com/PDFCraftTool/pdfcraft',
    twitter: 'https://twitter.com/pdfcraft',
  },
  creator: 'Craftisle PDF Team',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'free PDF tools',
    'browser-based PDF',
    'private PDF processing',
    'Craftisle',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | Craftisle PDF',
    defaultTitle: 'Craftisle PDF - Free Online PDF Tools',
    twitterHandle: '@craftisle',
    locale: 'en_US',
  },
};

/**
 * Navigation configuration
 */
export const navConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Tools', href: '/tools' },
    { title: 'About', href: '/about' },
    { title: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { title: 'Privacy', href: '/privacy' },
    { title: 'Terms', href: '/terms' },
    { title: 'Contact', href: '/contact' },
  ],
};
