import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { LocaleCodes, DefaultTranslation } from '@/constants/locales';

export const routing = defineRouting({
  // A list of all locales that are supported
  // Dynamically generated from AvailableTranslations
  locales: LocaleCodes,

  // Used when no locale matches
  defaultLocale: DefaultTranslation,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
