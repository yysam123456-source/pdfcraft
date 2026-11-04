/**
 * Robots.txt Generation
 * Configures crawling rules for search engines
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// Required for static export
export const dynamic = 'force-static';

// 🔴 robots 分组语义（Google 官方，2026-11-04 核实）：命中具名组的爬虫会
//    **完全忽略** `*` 组，且两组规则不合并。此前 pdf 的 6 个 AI 组只有
//    `Allow: /` ⇒ 等于放行 /api/ 与 /static/。修法：常量 + 每组复用。
// AI 清单含 OAI-SearchBot（ChatGPT Search 引用的管理 bot，此前 8 站全漏）、
// Claude-SearchBot / Perplexity-User（检索类）、CCBot（Common Crawl）。
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
];

// NOTE: `/_next/` is deliberately NOT disallowed. It serves the hashed
// CSS/JS bundles required to render every page; blocking it prevents
// Googlebot's Web Rendering Service from rendering the site and makes
// pages look unstyled in Search. `_next/static/*` files are hashed and
// safe to crawl. Only genuinely non-content paths are blocked below.
const ALLOW = ['/'];
const DISALLOW = ['/api/', '/static/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: ALLOW, disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ALLOW,
        disallow: DISALLOW,
      })),
    ],
    // Derived from siteConfig.url (NEXT_PUBLIC_SITE_URL ?? https://pdf.craftisle.com)
    // so this can never point at a foreign host again.
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
