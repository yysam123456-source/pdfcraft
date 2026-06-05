/**
 * SEO Metadata Generation Utilities
 * Provides functions for generating meta tags, Open Graph, and Twitter Card data
 * 
 * @module lib/seo/metadata
 */

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { type Locale, localeConfig, locales } from '@/lib/i18n/config';
import type { Tool, ToolContent } from '@/types/tool';
import { getBasePath } from '@/lib/utils/path';

/**
 * Force production OG image URL — never derive from env var at build time
 */
/**
 * Force rebuild: trigger Cloudflare Pages to pick up og:image fix
 * (localhost:3000 → https://pdf.craftisle.com/images/og-image.png)
 * Date: 2026-06-05
 */
const PRODUCTION_OG_IMAGE = 'https://pdf.craftisle.com/images/og-image.png';

/**
 * Base metadata configuration
 */
export interface BaseMetadataOptions {
  locale: Locale;
  path?: string;
}

/**
 * Page-specific metadata options
 */
export interface PageMetadataOptions extends BaseMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

/**
 * Tool page metadata options
 */
export interface ToolMetadataOptions extends BaseMetadataOptions {
  tool: Tool;
  content: ToolContent;
}

/**
 * Generate the canonical URL for a page
 */
export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const basePath = getBasePath().replace(/\/$/, '');
  return `${siteConfig.url}${basePath}/${locale}${cleanPath}`;
}

/**
 * Generate alternate language URLs for hreflang tags
 */
export function getAlternateUrls(path: string = ''): Record<string, string> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const alternates: Record<string, string> = {};
  const basePath = getBasePath().replace(/\/$/, '');

  for (const locale of locales) {
    alternates[locale] = `${siteConfig.url}${basePath}/${locale}${cleanPath}`;
  }

  // Add x-default pointing to English
  alternates['x-default'] = `${siteConfig.url}${basePath}/en${cleanPath}`;

  return alternates;
}

/**
 * Generate base metadata for any page
 */
export function generateBaseMetadata(options: PageMetadataOptions): Metadata {
  const { locale, path = '', title, description, keywords = [], image, noIndex = false } = options;

  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const canonicalUrl = getCanonicalUrl(locale, path);
  // Always ensure ogImage is absolute URL
  const ogImage = image || siteConfig.ogImage || PRODUCTION_OG_IMAGE;
  // Always use absolute URL — never derive from siteConfig.url at build time
  const ogImageUrl = PRODUCTION_OG_IMAGE;
  const ogLocale = getOpenGraphLocale(locale);

  // Ensure description is optimal length (150-160 characters)
  const optimizedDescription = description.length > 160
    ? description.substring(0, 157) + '...'
    : description;

  return {
    metadataBase: new URL('https://pdf.craftisle.com'),
    title: fullTitle,
    description: optimizedDescription,
    keywords: [...new Set([...keywords, 'PDF', 'PDF tools', 'free', 'online', siteConfig.name])],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    robots: noIndex
      ? { index: false, follow: false }
      : {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateUrls(path),
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      title: fullTitle,
      description: optimizedDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: PRODUCTION_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [PRODUCTION_OG_IMAGE],
      creator: siteConfig.creator,
    },
    verification: {
      // Add verification tags if needed
      // google: 'google-site-verification-code',
      // yandex: 'yandex-verification-code',
    },
    category: 'technology',
  };
}

/**
 * Generate metadata for tool pages
 */
export function generateToolMetadata(options: ToolMetadataOptions): Metadata {
  const { locale, tool, content } = options;
  const path = `/tools/${tool.slug}`;

  // Enhance keywords with common PDF-related terms
  const enhancedKeywords = [
    ...content.keywords,
    'free',
    'online',
    'no registration',
    'browser-based',
    'secure',
    'private',
  ];

  return generateBaseMetadata({
    locale,
    path,
    title: content.title,
    description: content.metaDescription,
    keywords: enhancedKeywords,
  });
}

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  const defaultTitle = `${siteConfig.name} - Free Online PDF Tools`;
  const defaultDescription = siteConfig.description;

  return generateBaseMetadata({
    locale,
    path: '',
    title: translations?.title || defaultTitle,
    description: translations?.description || defaultDescription,
    keywords: ['PDF tools', 'merge PDF', 'split PDF', 'compress PDF', 'convert PDF', 'free PDF tools', 'online PDF editor'],
  });
}

/**
 * Generate metadata for the tools listing page
 */
export function generateToolsListMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/tools',
    title: translations?.title || 'All PDF Tools',
    description: translations?.description || 'Browse all 67+ professional PDF tools. Merge, split, compress, convert, edit, and secure your PDF files for free.',
    keywords: ['PDF tools', 'all PDF tools', 'PDF editor', 'PDF converter', 'PDF merger', 'PDF splitter'],
  });
}

/**
 * Generate metadata for the about page
 */
export function generateAboutMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/about',
    title: translations?.title || 'About',
    description: translations?.description || `Learn about ${siteConfig.name} - your free, private, and powerful PDF toolkit. All processing happens in your browser.`,
    keywords: ['about', 'PDF tools', 'privacy', 'browser-based'],
  });
}

/**
 * Generate metadata for the FAQ page
 */
export function generateFaqMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/faq',
    title: translations?.title || 'Frequently Asked Questions',
    description: translations?.description || `Find answers to common questions about ${siteConfig.name}. Learn how to use our PDF tools effectively.`,
    keywords: ['FAQ', 'help', 'questions', 'PDF tools help'],
  });
}

/**
 * Generate metadata for the privacy page
 */
export function generatePrivacyMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/privacy',
    title: translations?.title || 'Privacy Policy',
    description: translations?.description || `${siteConfig.name} privacy policy. Your files never leave your device - all processing happens locally in your browser.`,
    keywords: ['privacy', 'security', 'data protection', 'local processing'],
  });
}

/**
 * Generate metadata for the terms page
 */
export function generateTermsMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/terms',
    title: translations?.title || 'Terms of Service',
    description: translations?.description || `${siteConfig.name} terms of service.`,
    keywords: ['terms', 'terms of service', 'legal', 'usage terms'],
  });
}

/**
 * Generate metadata for the contact page
 */
export function generateContactMetadata(locale: Locale, translations?: { title: string; description: string }): Metadata {
  return generateBaseMetadata({
    locale,
    path: '/contact',
    title: translations?.title || 'Contact Us',
    description: translations?.description || `Get in touch with ${siteConfig.name} team. We'd love to hear from you.`,
    keywords: ['contact', 'support', 'help', 'feedback'],
  });
}

/**
 * Convert locale to Open Graph locale format
 */
export function getOpenGraphLocale(locale: Locale): string {
  const ogLocaleMap: Record<Locale, string> = {
    en: 'en_US',
    ja: 'ja_JP',
    ko: 'ko_KR',
    es: 'es_ES',
    fr: 'fr_FR',
    de: 'de_DE',
    zh: 'zh_CN',
    'zh-TW': 'zh_TW',
    pt: 'pt_BR',
    ar: 'ar_AR',
    it: 'it_IT',
    id: 'id_ID',
    vi: 'vi_VN',
    ro: 'ro_RO',
  };
  return ogLocaleMap[locale] || 'en_US';
}

/**
 * Check if metadata contains all required fields
 */
export function validateMetadata(metadata: Metadata): {
  valid: boolean;
  missingFields: string[];
} {
  const requiredFields = ['title', 'description'];
  const requiredOgFields = ['title', 'description'];
  const requiredTwitterFields = ['card', 'title', 'description'];

  const missingFields: string[] = [];

  // Check base fields
  for (const field of requiredFields) {
    if (!metadata[field as keyof Metadata]) {
      missingFields.push(field);
    }
  }

  // Check Open Graph fields
  if (metadata.openGraph) {
    for (const field of requiredOgFields) {
      if (!metadata.openGraph[field as keyof typeof metadata.openGraph]) {
        missingFields.push(`og:${field}`);
      }
    }
  } else {
    missingFields.push('openGraph');
  }

  // Check Twitter Card fields
  if (metadata.twitter) {
    for (const field of requiredTwitterFields) {
      if (!metadata.twitter[field as keyof typeof metadata.twitter]) {
        missingFields.push(`twitter:${field}`);
      }
    }
  } else {
    missingFields.push('twitter');
  }

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
