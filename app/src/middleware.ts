import { NextRequest, NextResponse } from 'next/server';
import { fallbackLng, languages as locales } from '@/app/i18n/settings';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let the request for the root pass to show the animation page.
  if (pathname === '/') {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = `/${fallbackLng}${pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js|logo.svg).*)',
  ],
};
