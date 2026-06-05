import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { generateContactMetadata } from '@/lib/seo';
import ContactPageClient from './ContactPageClient';
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

  return generateContactMetadata(validLocale, {
    title: t('contact.title'),
    description: t('contact.description'),
  });
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Generate ContactPage structured data
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Craftisle PDF - Get Support & Feedback',
    description: 'Get in touch with Craftisle PDF team. We\'d love to hear from you.',
    url: `https://pdf.craftisle.com/${locale}/contact`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Craftisle PDF',
      url: 'https://pdf.craftisle.com',
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Craftisle PDF',
      url: 'https://pdf.craftisle.com',
    },
  };

  return (
    <>
      <JsonLd data={contactPageSchema} />
      <ContactPageClient locale={locale as Locale} />
    </>
  );
}
