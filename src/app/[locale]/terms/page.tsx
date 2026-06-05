import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateTermsMetadata } from '@/lib/seo';
import TermsPageClient from './TermsPageClient';
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

  return generateTermsMetadata(validLocale, {
    title: t('terms.title'),
    description: t('terms.description'),
  });
}

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Generate WebPage structured data
  const termsPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service - Craftisle PDF',
    description: 'Terms of Service for Craftisle PDF free online PDF tools.',
    url: `https://pdf.craftisle.com/${locale}/terms`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Craftisle PDF',
      url: 'https://pdf.craftisle.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Terms of Service',
    },
  };

  return (
    <>
      <JsonLd data={termsPageSchema} />
      <TermsPageClient locale={locale as Locale} />
    </>
  );
}
