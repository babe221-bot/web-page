import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/app/i18n/settings';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If the request is for the root, let it pass to show the animation page.
  if (pathname === '/') {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  req.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js|logo.svg).*)',
  ],
};
