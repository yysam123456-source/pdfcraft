/**
 * Category pillar content for SEO cornerstone pages.
 *
 * Each of the 6 tool categories gets a content-rich "pillar" page
 * (src/app/[locale]/tools/category/[category]) that aggregates its tools
 * with explanatory copy + FAQ. This builds topical authority (silo hub).
 *
 * Access pattern mirrors tool-content: per-locale map with English fallback.
 */

import type { FAQ } from '@/types/tool';
import type { ToolCategory } from '@/types/tool';
import type { Locale } from '@/lib/i18n/config';

/**
 * Content for a single category pillar page.
 * `description` and each `sections[].body` are sanitized HTML strings.
 */
export interface CategoryContent {
  /** H1 / <title> — includes the head keyword + "free online" */
  title: string;
  /** meta description, ~150-160 chars */
  metaDescription: string;
  /** primary + secondary keywords for the category cluster */
  keywords: string[];
  /** Intro paragraph(s) rendered under the H1 (HTML) */
  description: string;
  /** Explanatory guide sections (what / when / how / tips) */
  sections: {
    heading: string;
    body: string;
  }[];
  /** FAQ block (also emitted as FAQPage JSON-LD) */
  faq: FAQ[];
}

import { categoryContentEn } from './en';
import { categoryContentZh } from './zh';

/**
 * Per-locale content maps. Only en + zh are authored; the other 12 locales
 * fall back to English (matches the tool-content convention).
 */
const contentMap: Partial<Record<Locale, Record<ToolCategory, CategoryContent>>> = {
  en: categoryContentEn,
  zh: categoryContentZh,
};

/**
 * Get category pillar content for a locale, falling back to English.
 * Returns null only if the category itself is unknown.
 */
export function getCategoryContent(
  locale: Locale,
  category: ToolCategory,
): CategoryContent | null {
  const map = contentMap[locale];
  if (map && map[category]) {
    return map[category];
  }
  // Fallback to English
  return categoryContentEn[category] ?? null;
}
