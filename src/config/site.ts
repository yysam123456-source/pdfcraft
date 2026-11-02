/**
 * Canonical production origin for this site.
 *
 * This is the single source of truth for every absolute URL the site emits:
 * <link rel="canonical">, hreflang alternates, sitemap.xml <loc>, the robots.txt
 * `Sitemap:` directive, Open Graph `og:url` and all JSON-LD `url` values.
 */
const DEFAULT_SITE_URL = 'https://pdf.craftisle.com';

/**
 * Resolve the site origin, allowing per-environment override.
 *
 * NOTE: `NEXT_PUBLIC_*` variables are inlined by Next.js at BUILD time, so this
 * must be set in the build environment (Vercel / Netlify / Docker build stage),
 * not at runtime. Trailing slashes are stripped so template literals such as
 * `${siteConfig.url}/sitemap.xml` never produce `//sitemap.xml`.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SITE_URL;
  return url.replace(/\/+$/, '');
}

/**
 * Site configuration
 */
export const siteConfig = {
  name: 'PDFCraft',
  description: 'Professional PDF Tools - Free, Private & Browser-Based. Merge, split, compress, convert, and edit PDF files online without uploading to servers.',
  url: resolveSiteUrl(),
  ogImage: '/images/og-image.png',
  links: {
    github: 'https://github.com/PDFCraftTool/pdfcraft',
    twitter: 'https://twitter.com/pdfcraft',
  },
  creator: 'PDFCraft Team',
  keywords: [
    'PDF tools',
    'PDF editor',
    'merge PDF',
    'split PDF',
    'compress PDF',
    'convert PDF',
    'free PDF tools',
    'online PDF editor',
    'browser-based PDF',
    'private PDF processing',
  ],
  // SEO-related settings
  seo: {
    titleTemplate: '%s | PDFCraft',
    defaultTitle: 'PDFCraft - Professional PDF Tools',
    twitterHandle: '@pdfcraft',
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
    { title: 'Contact', href: '/contact' },
  ],
};
