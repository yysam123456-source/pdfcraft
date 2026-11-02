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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI crawlers declared explicitly (GEO): a wildcard Allow covers them,
      // but a named group is auditable in logs and survives tightening of `*`.
      ...['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot', 'Google-Extended'].map(
        (userAgent) => ({ userAgent, allow: '/' as const }),
      ),
      {
        userAgent: '*',
        allow: '/',
        // NOTE: `/_next/` is deliberately NOT disallowed. It serves the hashed
        // CSS/JS bundles required to render every page; blocking it prevents
        // Googlebot's Web Rendering Service from rendering the site and makes
        // pages look unstyled in Search. `_next/static/*` files are hashed and
        // safe to crawl. Only genuinely non-content paths are blocked below.
        disallow: [
          '/api/',
          '/static/',
        ],
      },
    ],
    // Derived from siteConfig.url (NEXT_PUBLIC_SITE_URL ?? https://pdf.craftisle.com)
    // so this can never point at a foreign host again.
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
