export const siteConfig = {
  name: 'Craftisle PDF',
  description: 'Free online PDF tools by Craftisle. Merge, split, compress, and convert PDF files. All processing happens in your browser for maximum privacy.',
  url: 'https://pdf.craftisle.com',
  ogImage: '/images/og-image.png',
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
