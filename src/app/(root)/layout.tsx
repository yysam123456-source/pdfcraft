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

// Root layout for the bare `/` route (the client-side locale negotiator).
//
// 🔴 2026-11-03（DEBT-47）：本文件原本是全站唯一的根布局，`<html>` **没有 lang 属性**，
//   语言只靠一段**客户端脚本**在运行时写 `document.documentElement.lang`。
//   ⇒ Googlebot 抓到的**原始 HTML 里没有语言声明**（hreflang 与 og:locale 是有的，
//   但 html lang 是语言声明的第一信号，缺失会削弱非英语页的排名能力），
//   而 14 个语种 × ~146 个页面 = ~2,044 个 URL 全部受影响。
//
//   修法：把 `[locale]` 段提升为**第二个根布局**（Next.js 官方「多根布局」模式，
//   用 route group `(root)` 承载裸 `/`），这样 `[locale]/layout.tsx` 能拿到
//   `params.locale` 并**服务端**输出 `<html lang="…">`。
//
//   本文件（`/` 协商器）本身不产出任何语言内容，lang="en" 是诚实且正确的默认值 ——
//   它会按浏览器语言跳转到对应语种。
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
              // 🔴 2026-11-03：原先这里有一段客户端脚本用 pathname 猜 lang 并写
              //   document.documentElement.lang。现在 lang 改为**服务端**输出
              //   （[locale]/layout.tsx 的 <html lang={locale}>），脚本再猜一遍
              //   只会与服务器声明打架（例如服务器说是 ja、脚本猜成 en）⇒ 删掉。
              //   主题初始化必须留在脚本里（要在 hydration 前避免闪白），保留。
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
