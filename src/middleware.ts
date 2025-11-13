import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LANGS = ['en', 'ru'];

export function middleware(req: NextRequest) {
  const lang = req.nextUrl.pathname.split('/')[1];
  if (!SUPPORTED_LANGS.includes(lang)) {
    const url = req.nextUrl.clone();
    url.pathname = `/en/not-found`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
