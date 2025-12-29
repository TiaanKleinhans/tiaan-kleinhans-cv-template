'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';

interface Translation {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  totalDownloads: number;
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [translations, setTranslations] = useState<Translation[]>([]);

  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch('/api/translations/available');
        if (response.ok) {
          const data = await response.json();
          setTranslations(data.translations || []);
        }
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    }

    fetchTranslations();
  }, []);

  const switchLocale = (newLocale: string) => {
    const currentPath = window.location.pathname;

    // Build regex pattern from available translation codes
    const localeCodes = translations.map((t) => t.code).join('|');

    let pathWithoutLocale = currentPath;

    // Create regex pattern to match any locale code
    const localePattern = new RegExp(`^/(${localeCodes})$`);
    const localePatternWithPath = new RegExp(`^/(${localeCodes})/`);

    // Match pattern like /en, /fr, /es, etc.
    if (localeCodes && pathWithoutLocale.match(localePattern)) {
      // If it's just a locale code, set to root
      pathWithoutLocale = '/';
    } else if (localeCodes && pathWithoutLocale.match(localePatternWithPath)) {
      // If it's /locale/something, remove /locale part
      pathWithoutLocale = pathWithoutLocale.replace(new RegExp(`^/(${localeCodes})`), '');
    }

    const newPath =
      pathWithoutLocale === '/' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`;

    window.location.replace(newPath);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="language-select" style={{ marginRight: '0.5rem' }}>
        Language:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}
      >
        {translations.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
