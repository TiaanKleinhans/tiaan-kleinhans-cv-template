/**
 * Available Translations Configuration
 * 
 * This file defines all available languages/translations in the application.
 * Add or remove languages by uncommenting/commenting entries here.
 * 
 * The `code` should match the locale code used in:
 * - The [locale] folder structure
 * - The messages/{code}.json files
 * - The routing configuration
 */

export const AvailableTranslations = [
  { code: 'en', name: 'English', sortOrder: 0 },
  { code: 'fr', name: 'French', sortOrder: 1 },
  { code: 'es', name: 'Spanish', sortOrder: 2 },
  // { code: 'mi', name: 'Māori', sortOrder: 3 },
  // { code: 'de', name: 'German', sortOrder: 4 },
] as const;

export const DefaultTranslation = 'en' as const;

/**
 * Extract just the locale codes from AvailableTranslations
 * This is used by the routing configuration
 */
export const LocaleCodes = AvailableTranslations.map((lang) => lang.code);

/**
 * Type for locale codes
 */
export type LocaleCode = typeof AvailableTranslations[number]['code'];

