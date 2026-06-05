import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generatePrivacyMetadata } from '@/lib/seo';
import PrivacyPageClient from './PrivacyPageClient';
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

  return generatePrivacyMetadata(validLocale, {
    title: t('privacy.title'),
    description: t('privacy.description'),
  });
}

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Generate WebPage structured data
  const privacyPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy - Craftisle PDF',
    description: 'Craftisle PDF privacy policy. Your files never leave your device - all processing happens locally in your browser.',
    url: `https://pdf.craftisle.com/${locale}/privacy`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Craftisle PDF',
      url: 'https://pdf.craftisle.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Privacy Policy',
    },
  };

  return (
    <>
      <JsonLd data={privacyPageSchema} />
      <PrivacyPageClient locale={locale as Locale} />
    </>
  );
}
