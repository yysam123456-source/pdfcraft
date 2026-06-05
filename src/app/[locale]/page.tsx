import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import HomePageClient from './HomePageClient';
import { generateWebSiteSchema, generateOrganizationSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get localized content for tools
  const { tools } = await import('@/config/tools');
  const { getToolContent } = await import('@/config/tool-content');

  const localizedToolContent = tools.reduce((acc, tool) => {
    const content = getToolContent(locale as Locale, tool.id);
    // Use metaDescription for the card description as it's short and summary-like
    // Use title from the content
    if (content) {
      acc[tool.id] = {
        title: content.title,
        description: content.metaDescription
      };
    }
    return acc;
  }, {} as Record<string, { title: string; description: string }>);

  // Generate JSON-LD for WebSite and Organization
  const webSiteSchema = generateWebSiteSchema(locale as Locale);
  const organizationSchema = generateOrganizationSchema();
  const jsonLdData = [webSiteSchema, organizationSchema];

  return (
    <>
      <JsonLd data={jsonLdData} />
      <HomePageClient locale={locale as Locale} localizedToolContent={localizedToolContent} />
    </>
  );
}
