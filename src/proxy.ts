import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export const proxy = createMiddleware(routing);
export default proxy;
 
export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the locale of the visitor
    '/(ar|en)/:path*',

    // Match all pathnames except for
    // - API routes
    // - Static files (_next, images, etc.)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
