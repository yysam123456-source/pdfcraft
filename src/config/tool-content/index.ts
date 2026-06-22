/**
 * Tool content exports for all languages
 * Requirements: 3.1 - Multi-language support
 */

export { toolContentEn } from './en';
export { toolContentJa } from './ja';
export { toolContentKo } from './ko';
export { toolContentEs } from './es';
export { toolContentFr } from './fr';
export { toolContentDe } from './de';
export { toolContentZh } from './zh';
export { toolContentZhTW } from './zh-TW';
export { toolContentPt } from './pt';
export { toolContentAr } from './ar';
export { toolContentIt } from './it';
export { toolContentId } from './id';
export { toolContentVn } from './vi';
export { toolContentRo } from './ro';

import { toolContentEn } from './en';
import { toolContentJa } from './ja';
import { toolContentKo } from './ko';
import { toolContentEs } from './es';
import { toolContentFr } from './fr';
import { toolContentDe } from './de';
import { toolContentZh } from './zh';
import { toolContentZhTW } from './zh-TW';
import { toolContentPt } from './pt';
import { toolContentAr } from './ar';
import { toolContentIt } from './it';
import { toolContentId } from './id';
import { toolContentVn } from './vi';
import { toolContentRo } from './ro';
import { ToolContent } from '@/types/tool';

export type Locale = 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'zh' | 'zh-TW' | 'pt' | 'ar' | 'it' | 'id' | 'vi' | 'ro';

/**
 * Get tool content for a specific locale
 * Falls back to English if translation not found
 * zh-TW falls back to zh (Simplified Chinese) content
 * ar falls back to en content for now
 * If no English translation exists, generates a minimal default ToolContent from the toolId
 */
function getDefaultToolContent(toolId: string): ToolContent {
  const parts = toolId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1));
  const title = parts.join(' ');
  return {
    title,
    metaDescription: `${title} free online - no registration, no sign-up. Process your files securely in your browser.`,
    keywords: [toolId, `free ${toolId}`, `online ${toolId}`],
    description: `<p>${title} free online with our powerful browser-based tool.</p>`,
    howToUse: [
      { step: 1, title: 'Upload', description: 'Upload your file.' },
      { step: 2, title: 'Process', description: 'Click to process.' },
      { step: 3, title: 'Download', description: 'Download the result.' },
    ],
    useCases: [
      { title: 'For Work', description: `Use ${title} for professional documents.`, icon: 'tool' },
    ],
    faq: [
      { question: `Is ${title} free?`, answer: 'Yes, completely free.' },
    ],
  };
}

export function getToolContent(locale: Locale, toolId: string): ToolContent {
  const contentMap: Record<string, Record<string, ToolContent>> = {
    en: toolContentEn,
    ja: toolContentJa,
    ko: toolContentKo,
    es: toolContentEs,
    fr: toolContentFr,
    de: toolContentDe,
    zh: toolContentZh,
    'zh-TW': toolContentZhTW,
    pt: toolContentPt,
    ar: toolContentAr,
    it: toolContentIt,
    id: toolContentId,
    vi: toolContentVn,
    ro: toolContentRo,
  };

  const localeContent = contentMap[locale];
  if (localeContent && localeContent[toolId]) {
    return localeContent[toolId];
  }

  // Fallback to English
  const enContent = toolContentEn[toolId];
  if (enContent) {
    return enContent;
  }

  // No translation at all — return a default minimal ToolContent
  return getDefaultToolContent(toolId);
}

