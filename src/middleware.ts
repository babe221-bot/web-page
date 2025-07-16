import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './next-i18next.config';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { locales, defaultLocale } = i18n;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = defaultLocale;
  req.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js).*)',
  ],
};
