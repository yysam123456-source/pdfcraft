import Script from "next/script";
import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Craftisle PDF - Free Online PDF Tools',
    template: '%s | Craftisle PDF',
  },
  description: 'Free online PDF tools by Craftisle. Merge, split, compress, and convert PDF files. All processing happens in your browser for maximum privacy.',
  keywords: ['PDF tools', 'PDF editor', 'merge PDF', 'split PDF', 'compress PDF', 'free PDF tools', 'browser-based PDF', 'private PDF processing', 'Craftisle'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Craftisle PDF - Free Online PDF Tools',
    description: 'Free online PDF tools by Craftisle. Merge, split, compress, and convert PDF files.',
    url: 'https://pdf.craftisle.com',
    siteName: 'Craftisle PDF',
    images: ['/images/og-image.png'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFCraft - Professional PDF Tools',
    description: 'Free online PDF tools for merging, splitting, compressing, and converting PDF files.',
  },
  alternates: {
    languages: {
      'en': 'https://pdf.craftisle.com/en',
      'zh': 'https://pdf.craftisle.com/zh',
      'x-default': 'https://pdf.craftisle.com/',
    },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: 'html{scrollbar-gutter:stable}' }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
        {/* Google AdSense - only loads when NEXT_PUBLIC_ADSENSE_CLIENT is set */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        {/* Monetag Vignette Banner - controlled by NEXT_PUBLIC_ADVER_ENABLE */}
        {process.env.NEXT_PUBLIC_ADVER_ENABLE === 'true' && (
          <Script
            id="monetag-vignette"
            src="/monetag-vignette.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
