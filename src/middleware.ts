import { NextRequest, NextResponse } from 'next/server';

const locales = ['sr', 'en'];
const defaultLocale = 'sr';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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
