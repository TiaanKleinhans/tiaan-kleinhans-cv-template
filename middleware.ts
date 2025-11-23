import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { LocaleCodes } from './constants/locales';

export default createMiddleware(routing);

// Note: Next.js requires matcher to be static strings (not template literals with variables)
// ⚠️ IMPORTANT: When adding/removing locales in constants/locales.ts, 
//    update the matcher pattern below to match!
//    Current locales from AvailableTranslations: en, fr, es
//    Pattern format: '/(locale1|locale2|locale3)/:path*'
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fr|es)/:path*']
};

// Runtime validation to ensure matcher matches AvailableTranslations
// This will throw an error in development if they're out of sync
if (process.env.NODE_ENV === 'development') {
  const matcherLocales = config.matcher[1]?.match(/\(([^)]+)\)/)?.[1]?.split('|') || [];
  const expectedLocales = LocaleCodes;
  const matcherSet = new Set(matcherLocales);
  const expectedSet = new Set(expectedLocales);
  
  if (matcherLocales.length !== expectedLocales.length || 
      !matcherLocales.every(loc => expectedSet.has(loc)) ||
      !expectedLocales.every(loc => matcherSet.has(loc))) {
    console.warn(
      '⚠️  WARNING: Middleware matcher does not match AvailableTranslations!\n' +
      `   Matcher has: ${matcherLocales.join(', ')}\n` +
      `   AvailableTranslations has: ${expectedLocales.join(', ')}\n` +
      '   Please update the matcher in middleware.ts to match constants/locales.ts'
    );
  }
}

