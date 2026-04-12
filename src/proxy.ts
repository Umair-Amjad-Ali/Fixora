import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they contain a dot, e.g. `favicon.ico`
  // - api routes
  // - _next (internal paths)
  // - static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
