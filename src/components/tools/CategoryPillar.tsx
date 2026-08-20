'use client';

import { useTranslations } from 'next-intl';
import { Tool, ToolCategory } from '@/types/tool';
import type { CategoryContent } from '@/config/category-content';
import { Card } from '@/components/ui/Card';
import { getToolIcon } from '@/config/icons';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { type Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { sanitizeHtml } from '@/lib/utils/html-sanitizer';

export interface CategoryPillarProps {
  category: ToolCategory;
  content: CategoryContent;
  locale: string;
  tools: Tool[];
  /** Pre-resolved localized titles/descriptions for the category's tools */
  localizedTools: Record<string, { title: string; description: string }>;
}

/**
 * Maps a ToolCategory to its translation key under `home.categories.*`.
 * Mirrors the map used by ToolPage breadcrumbs.
 */
const categoryTranslationKeys: Record<ToolCategory, string> = {
  'edit-annotate': 'editAnnotate',
  'convert-to-pdf': 'convertToPdf',
  'convert-from-pdf': 'convertFromPdf',
  'organize-manage': 'organizeManage',
  'optimize-repair': 'optimizeRepair',
  'secure-pdf': 'securePdf',
};

/**
 * Category pillar page — the cornerstone (silo hub) for a tool cluster.
 * Renders explanatory copy + an internal-link grid of all tools in the category.
 */
export function CategoryPillar({
  category,
  content,
  locale,
  tools,
  localizedTools,
}: CategoryPillarProps) {
  const t = useTranslations();
  const categoryName = t(`home.categories.${categoryTranslationKeys[category]}`);

  const sanitizedDescription = useMemo(
    () => sanitizeHtml(content.description),
    [content.description],
  );
  const sanitizedSections = useMemo(
    () =>
      content.sections.map((s) => ({
        heading: s.heading,
        body: sanitizeHtml(s.body),
      })),
    [content.sections],
  );

  return (
    <div className="min-h-screen flex flex-col" data-testid="category-pillar-page">
      <Header locale={locale as Locale} />

      <main id="main-content" className="flex-1" tabIndex={-1}>
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-8 w-full">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center text-sm text-[hsl(var(--color-muted-foreground))]"
        >
          <Link
            href={`/${locale}`}
            className="flex items-center hover:text-[hsl(var(--color-primary))] transition-colors"
            title={t('common.navigation.home')}
          >
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[hsl(var(--color-border))]" />
          <Link
            href={`/${locale}/tools`}
            className="hover:text-[hsl(var(--color-primary))] transition-colors"
          >
            {t('common.navigation.tools')}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[hsl(var(--color-border))]" />
          <span className="font-medium text-[hsl(var(--color-foreground))]" aria-current="page">
            {categoryName}
          </span>
        </nav>

        {/* Header */}
        <header className="text-center" data-testid="category-pillar-header">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[hsl(var(--color-foreground))] mb-3"
            data-testid="category-pillar-title"
          >
            {content.title}
          </h1>
          <p
            className="text-lg text-[hsl(var(--color-muted-foreground))] max-w-3xl mx-auto leading-relaxed mb-4"
            data-testid="category-pillar-subtitle"
          >
            {content.metaDescription}
          </p>
        </header>

        {/* Intro description */}
        <section className="mt-8" data-testid="category-pillar-intro" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="sr-only">
            {categoryName}
          </h2>
          <Card variant="outlined" size="lg" className="glass-card">
            <div
              className="prose prose-sm max-w-none text-[hsl(var(--color-foreground))/0.8]"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </Card>
        </section>

        {/* Explanatory guide sections */}
        {sanitizedSections.map((section, index) => (
          <section
            key={index}
            className="mt-10"
            data-testid={`category-section-${index}`}
            aria-labelledby={`section-heading-${index}`}
          >
            <h2
              id={`section-heading-${index}`}
              className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-6"
            >
              {section.heading}
            </h2>
            <Card variant="outlined" size="lg" className="glass-card">
              <div
                className="prose prose-sm max-w-none text-[hsl(var(--color-foreground))/0.8]"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            </Card>
          </section>
        ))}

        {/* Tool grid — the silo hub internal links */}
        <section
          className="mt-10"
          data-testid="category-pillar-tools"
          aria-labelledby="category-tools-heading"
        >
          <h2
            id="category-tools-heading"
            className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-6"
          >
            {categoryName}
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="category-tools-grid"
          >
            {tools.map((tool) => {
              const localized = localizedTools[tool.id];
              const toolName =
                localized?.title ||
                tool.id
                  .split('-')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ');
              const IconComponent = getToolIcon(tool.icon);

              return (
                <Link
                  key={tool.id}
                  href={`/${locale}/tools/${tool.slug}`}
                  className="block group"
                  data-testid={`category-tool-${tool.id}`}
                >
                  <Card
                    hover
                    clickable
                    className="h-full glass-card transition-all duration-300 group-hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl bg-[hsl(var(--color-primary)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--color-primary))] transition-colors duration-300"
                        aria-hidden="true"
                      >
                        <IconComponent className="w-6 h-6 text-[hsl(var(--color-primary))] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <span className="font-semibold text-[hsl(var(--color-foreground))] block mb-1">
                          {toolName}
                        </span>
                        <span className="text-xs text-[hsl(var(--color-muted-foreground))]">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section
            className="mt-10"
            data-testid="category-pillar-faq"
            aria-labelledby="category-faq-heading"
          >
            <h2
              id="category-faq-heading"
              className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-6"
            >
              {t('tools.faq')}
            </h2>
            <div className="space-y-4" data-testid="category-faq-list">
              {content.faq.map((item, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  className="glass-card"
                  data-testid={`category-faq-item-${index}`}
                >
                  <h3 className="font-semibold text-[hsl(var(--color-foreground))]">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm text-[hsl(var(--color-muted-foreground))]">
                    {item.answer}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}
        </div>
      </main>

      <Footer locale={locale as Locale} />
    </div>
  );
}

export default CategoryPillar;
