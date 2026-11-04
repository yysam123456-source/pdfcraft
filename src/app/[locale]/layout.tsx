import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { localeConfig, type Locale, locales } from '@/lib/i18n/config';
import { generateHomeMetadata } from '@/lib/seo';
import { fontVariables } from '@/lib/fonts';
import { SkipLink } from '@/components/common/SkipLink';
import { AdLoader } from '@/components/common/AdLoader';
import '@/app/globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Viewport configuration for performance
 * Requirements: 8.1 - Lighthouse performance score 90+
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Validate locale
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';

  // Get localized SEO translations
  const t = await getTranslations({ locale: validLocale, namespace: 'metadata' });

  // Generate metadata using the SEO module with translations
  return generateHomeMetadata(validLocale, {
    title: t('home.title'),
    description: t('home.description'),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const validLocale = locale as Locale;

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  // Get direction for the locale
  const direction = localeConfig[validLocale]?.direction || 'ltr';

  // 🔴 2026-11-03（DEBT-47）：本 layout 已被提升为**根布局**（Next.js 多根布局模式），
  //   目的是让 `<html lang>` **服务端**输出，而不是靠客户端脚本猜。
  //   修之前：全站根布局 `<html>` 无 lang 属性，语言只由 inline script 在运行时写入
  //   ⇒ Googlebot 抓到的原始 HTML 里没有语言声明 ⇒ 14 个语种 ~2,044 个 URL
  //   的非英语页面都缺第一语言信号（hreflang / og:locale 有，但 html lang 才是主信号）。
  //   修之后：`<html lang={validLocale}>` 与页面实际内容、与 hreflang 组三者一致。
  return (
    <html lang={validLocale} suppressHydrationWarning>
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
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <div dir={direction} className={`${fontVariables} min-h-screen bg-background text-foreground antialiased font-sans`}>
            <SkipLink targetId="main-content">Skip to main content</SkipLink>
            {children}
          </div>
        </NextIntlClientProvider>
        {/* Ad scripts - controlled by src/lib/config/ads.ts */}
        <AdLoader />
      </body>
    </html>
  );
}
