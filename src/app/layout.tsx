import type { Metadata } from 'next';
import '@/app/globals.css';
import { siteConfig } from '@/config/site';
import { AdLoader } from '@/components/common/AdLoader';

/**
 * Root metadata.
 *
 * The root route `/` is a client-side locale negotiator (`src/app/page.tsx`
 * renders `null` and redirects to `/en`, `/ja`, ...). Because that page has no
 * `generateMetadata` of its own, this is the ONLY metadata block applied to
 * `https://<host>/`, which is why it must carry a canonical + og:url —
 * otherwise the site root is indexable as a duplicate of `/en`.
 *
 * Canonical target is `/en` (the defaultLocale home, which is also the
 * `x-default` hreflang target emitted by `lib/seo/metadata.ts`), so the blank
 * `/` negotiator consolidates into a real content page.
 *
 * Every `[locale]/*` route overrides these fields via its own generateMetadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: 'PDFCraft - Professional PDF Tools',
  description: 'Free online PDF tools for merging, splitting, compressing, and converting PDF files. All processing happens in your browser for maximum privacy.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      'x-default': `${siteConfig.url}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/en`,
    siteName: siteConfig.name,
    title: 'PDFCraft - Professional PDF Tools',
    description: 'Free online PDF tools for merging, splitting, compressing, and converting PDF files. All processing happens in your browser for maximum privacy.',
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: 'PDFCraft - Professional PDF Tools',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFCraft - Professional PDF Tools',
    description: 'Free online PDF tools for merging, splitting, compressing, and converting PDF files. All processing happens in your browser for maximum privacy.',
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
};

// Root layout - provides the basic HTML structure
// The actual layout with i18n is in [locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var lang = window.location.pathname.split('/')[1];
                if (lang && ['en','ja','ko','es','fr','de','zh','zh-TW','pt','ar','it','id','vi','ro'].includes(lang)) {
                  document.documentElement.lang = lang;
                } else {
                  document.documentElement.lang = 'en';
                }
              } catch (_) {}
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        {/* Ad scripts - controlled by src/lib/config/ads.ts */}
        <AdLoader />
      </body>
    </html>
  );
}
