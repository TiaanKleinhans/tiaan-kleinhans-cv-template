import createMiddleware from 'next-intl/middleware';
import { routing, LocaleCodes } from './i18n/routing';

export default createMiddleware(routing);

// Note: Next.js requires matcher to be static strings (not template literals with variables)
// ⚠️ IMPORTANT: When adding/removing locales in your available_translations database table, 
//    update the matcher pattern below to match i18n/routing.ts LocaleCodes!
//    Current locales: en, fr, es, de, it, mi, pt
//    Pattern format: '/(locale1|locale2|locale3|...)/:path*'
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fr|es|de|it|mi|pt)/:path*']
};

// Runtime validation to ensure matcher matches LocaleCodes from routing
// This will throw an error in development if they're out of sync
if (process.env.NODE_ENV === 'development') {
  const matcherLocales = config.matcher[1]?.match(/\(([^)]+)\)/)?.[1]?.split('|') || [];
  const expectedLocales = Array.from(LocaleCodes);
  const matcherSet = new Set<string>(matcherLocales);
  const expectedSet = new Set<string>(expectedLocales);
  
  if (matcherLocales.length !== expectedLocales.length || 
      !matcherLocales.every((loc: string) => expectedSet.has(loc)) ||
      !expectedLocales.every((loc: string) => matcherSet.has(loc))) {
    console.warn(
      '⚠️  WARNING: Middleware matcher does not match LocaleCodes!\n' +
      `   Matcher has: ${matcherLocales.join(', ')}\n` +
      `   LocaleCodes has: ${expectedLocales.join(', ')}\n` +
      '   Please update the matcher in middleware.ts to match i18n/routing.ts'
    );
  }
}

