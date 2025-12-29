import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// NOTE: These static values are required for Next.js routing at build time.
// They MUST match the locale codes in your available_translations database table.
// 
// To keep in sync with your database:
// 1. Query your available_translations table
// 2. Extract all 'code' values
// 3. Update this array to match
// 4. Update the middleware.ts matcher pattern accordingly
//
// Current locales in messages folder: en, fr, es, de, it, mi, pt
export const LocaleCodes = ['en', 'fr', 'es', 'de', 'it', 'mi', 'pt'] as const;
export const DefaultTranslation = 'en' as const;

export const routing = defineRouting({
  // A list of all locales that are supported
  // These should match the codes in your available_translations database table
  locales: LocaleCodes,

  // Used when no locale matches
  defaultLocale: DefaultTranslation,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
