'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Sheet } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

interface Translation {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  totalDownloads: number;
}

export function SettingsMenu() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const translate = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchTranslations() {
      try {
        const response = await fetch('/api/translations/available');
        if (!response.ok) {
          console.error('Failed to fetch translations');
          return;
        }
        const data = await response.json();
        setTranslations(data.translations || []);
      } catch (error) {
        console.error('Error fetching translations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTranslations();
  }, []);

  const switchLocale = (newLocale: string) => {
    // Get the actual current pathname from the browser (e.g., "/en" or "/en/some-path")
    const currentPath = window.location.pathname;

    const localeCodes = translations.map((t) => t.code).join('|');

    let pathWithoutLocale = currentPath;

    const localePattern = new RegExp(`^/(${localeCodes})$`);
    const localePatternWithPath = new RegExp(`^/(${localeCodes})/`);

    if (localeCodes && pathWithoutLocale.match(localePattern)) {
      pathWithoutLocale = '/';
    } else if (localeCodes && pathWithoutLocale.match(localePatternWithPath)) {
      // If it's /locale/something, remove /locale part
      pathWithoutLocale = pathWithoutLocale.replace(new RegExp(`^/(${localeCodes})`), '');
    }

    const newPath =
      pathWithoutLocale === '/' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`;

    setDialogOpen(false);
    setSheetOpen(false);

    window.location.replace(newPath);
  };

  const handleLanguageClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <button
        onClick={() => setSheetOpen(true)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[var(--primary)]/90 hover:bg-[var(--primary)] text-white shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--secondary)] focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Open settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} side="right">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-white mb-2">
            {translate('SETTINGS.MENU.TITLE')}
          </h2>

          <button
            onClick={() => {
              handleLanguageClick();
              setSheetOpen(false);
            }}
            className={cn(
              'flex items-center gap-3 p-4 rounded-lg text-left',
              'bg-[var(--primary)] hover:bg-white/10',
              'border border-white/20 hover:border-[var(--secondary)]/50',
              'text-white transition-all',
              'focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]'
            )}
          >
            <Languages className="h-5 w-5 text-white" />
            <span className="font-medium">{translate('SETTINGS.MENU.CHANGE_LANGUAGE')}</span>
          </button>
        </div>
      </Sheet>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="!bg-[var(--primary)] !text-white">
          <ScrollAnimation delay={0.2}>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center">
                {translate('SETTINGS.LANGUAGE.TITLE')}
              </DialogTitle>
            </DialogHeader>
          </ScrollAnimation>

          <ScrollAnimation delay={0.4}>
            <Table>
              <TableHeader>
                <TableRow className="pt-2 pb-0 flex items-center justify-center">
                  <TableHead className="!text-white">
                    {translate('SETTINGS.LANGUAGE.DESCRIPTION')}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell className="flex items-center justify-center font-medium text-white/70">
                      Loading languages...
                    </TableCell>
                  </TableRow>
                ) : (
                  translations.map((lang) => (
                    <TableRow
                      key={lang.code}
                      className={cn(
                        'border-b border-gray-300 hover:bg-gray-900 cursor-pointer',
                        locale === lang.code && 'bg-gray-900'
                      )}
                      onClick={() => switchLocale(lang.code)}
                    >
                      <TableCell className="flex items-center justify-center font-medium">
                        <span className={cn('text-white', locale === lang.code && 'font-semibold')}>
                          {lang.name}
                          {locale === lang.code && ' ✓'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollAnimation>
        </DialogContent>
      </Dialog>
    </>
  );
}
