import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n/config';
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool';
import { getAllTools } from '@/config/tools';
import { getToolContent } from '@/config/tool-content';
import { getCategoryContent } from '@/config/category-content';
import { CategoryPillar } from '@/components/tools/CategoryPillar';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import {
  generateCategoryWebPageSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

interface CategoryPageParams {
  params: Promise<{
    locale: string;
    category: string;
  }>;
}

/**
 * Pre-render every (locale, category) combination.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    TOOL_CATEGORIES.map((category) => ({
      locale,
      category,
    })),
  );
}

/**
 * Metadata — reuses the site's base metadata so canonical + hreflang
 * (including x-default) are emitted consistently with tool pages.
 */
export async function generateMetadata({
  params,
}: CategoryPageParams): Promise<Metadata> {
  const { locale, category } = await params;
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const validCategory = TOOL_CATEGORIES.includes(category as ToolCategory)
    ? (category as ToolCategory)
    : null;

  if (!validCategory) {
    return { title: 'Not Found' };
  }

  const content = getCategoryContent(validLocale, validCategory);
  if (!content) {
    return { title: validCategory };
  }

  return generateBaseMetadata({
    locale: validLocale,
    path: `/tools/category/${validCategory}`,
    title: content.title,
    description: content.metaDescription,
    keywords: content.keywords,
  });
}

/**
 * Category pillar (cornerstone) page — silo hub that aggregates a tool cluster.
 */
export default async function CategoryPage({ params }: CategoryPageParams) {
  const { locale, category } = await params;

  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  const validCategory = TOOL_CATEGORIES.includes(category as ToolCategory)
    ? (category as ToolCategory)
    : null;

  if (!validCategory) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(validLocale);

  const content = getCategoryContent(validLocale, validCategory);
  if (!content) {
    notFound();
  }

  // Tools in this category + their localized titles/descriptions for the grid
  const categoryTools = getAllTools().filter((t) => t.category === validCategory);
  const localizedTools = categoryTools.reduce(
    (acc, tool) => {
      const tc = getToolContent(validLocale, tool.id);
      if (tc) {
        acc[tool.id] = { title: tc.title, description: tc.metaDescription };
      }
      return acc;
    },
    {} as Record<string, { title: string; description: string }>,
  );

  // Structured data
  const webPage = generateCategoryWebPageSchema(content, validCategory, validLocale);
  const breadcrumb = generateBreadcrumbSchema(
    [
      { name: 'Home', path: '' },
      { name: 'Tools', path: '/tools' },
      { name: content.title, path: `/tools/category/${validCategory}` },
    ],
    validLocale,
  );
  const faqSchema = content.faq && content.faq.length > 0
    ? generateFAQPageSchema(content.faq)
    : null;

  return (
    <>
      <JsonLd
        data={[webPage, breadcrumb, ...(faqSchema ? [faqSchema] : [])]}
      />
      <CategoryPillar
        category={validCategory}
        content={content}
        locale={validLocale}
        tools={categoryTools}
        localizedTools={localizedTools}
      />
    </>
  );
}
