import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect to default locale (English)
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url, 308); // 308 Permanent Redirect
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except _next, api, static assets
    '/((?!_next|api|static|.*\\..*).*)',
  ],
};
