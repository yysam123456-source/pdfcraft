import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateAboutMetadata } from '@/lib/seo';
import AboutPageClient from './AboutPageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const t = await getTranslations({ locale: validLocale, namespace: 'metadata' });

  return generateAboutMetadata(validLocale, {
    title: t('about.title'),
    description: t('about.description'),
  });
}

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Generate WebPage structured data
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'About Craftisle PDF - Free Online PDF Tools',
    description: 'Learn about Craftisle PDF - your free, private, and powerful PDF toolkit. All processing happens in your browser.',
    url: `https://pdf.craftisle.com/${locale}/about`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Craftisle PDF',
      url: 'https://pdf.craftisle.com',
    },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      <AboutPageClient locale={locale as Locale} />
    </>
  );
}
