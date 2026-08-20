'use client';

import React from 'react';
import { Tool } from '@/types/tool';
import { getToolById } from '@/config/tools';
import { getToolContent, type Locale } from '@/config/tool-content';
import { ToolCard } from './ToolCard';

export interface ToolHubProps {
  /** The hub tool (e.g. pdf-converter, free-pdf-tools) */
  tool: Tool;
  /** Current locale for URL generation */
  locale: Locale;
}

/**
 * ToolHub renders a responsive grid of related tools for hub-style entries
 * that aggregate several individual tools (e.g. pdf-converter, free-pdf-tools).
 * It reuses the existing ToolCard so every card is a real internal link,
 * which builds the internal-link cluster that the T2 SEO plan calls for.
 * Falls back to nothing when there are no resolvable related tools.
 */
export function ToolHub({ tool, locale }: ToolHubProps) {
  const relatedTools = tool.relatedTools
    .map((id) => getToolById(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="tool-hub">
      {relatedTools.map((rt) => {
        const c = getToolContent(locale, rt.id);
        return (
          <ToolCard
            key={rt.id}
            tool={rt}
            locale={locale}
            localizedContent={c ? { title: c.title, description: c.metaDescription } : undefined}
          />
        );
      })}
    </div>
  );
}
