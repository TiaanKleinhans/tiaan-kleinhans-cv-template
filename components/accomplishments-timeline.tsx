'use client';

import { useTranslations } from 'next-intl';
import { CurrentUser } from '@/constants/current-user';
import { useEffect, useState, useMemo } from 'react';
import type { Accomplishment } from '@/types/database';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { getIconByName } from '@/lib/icon-utils';
import type { LucideIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from '@/components/ui/dialog';

interface AccomplishmentCardProps {
  accomplishment: Accomplishment;
  index: number;
  translate: (key: string) => string;
}

function AccomplishmentCard({ accomplishment, index, translate }: AccomplishmentCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasIcon = accomplishment.icon && accomplishment.icon.trim() !== '';
  const IconComponent = hasIcon ? getIconByName(accomplishment.icon!) : null;
  const fullTitle =
    translate('ACCOMPLISHMENTS.' + accomplishment.translation_key + '.TITLE') ||
    accomplishment.name;

  // Split title at "—" to separate main title from date
  const titleParts = fullTitle.split(' — ');
  const mainTitle = titleParts[0] || fullTitle;
  const dateSubtitle = titleParts[1] || null;

  const description =
    translate('ACCOMPLISHMENTS.' + accomplishment.translation_key + '.DESCRIPTION') ||
    'No description available.';

  return (
    <ScrollAnimation
      delay={index * 0.1}
      animateOnce={false}
      className="relative z-10 pointer-events-auto w-full"
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* Card content */}
          <div className="w-full bg-black/50 backdrop-blur-md px-3 py-2 rounded-xl border border-white/25 shadow-xl flex items-center gap-2.5 cursor-pointer hover:bg-black/60 hover:border-white/40 transition-all duration-200">
            {/* Icon on the left */}
            <div className="flex-shrink-0">
              {hasIcon && IconComponent ? (
                <div className="flex items-center justify-center w-7 h-7 bg-white/15 backdrop-blur-md rounded-full border border-white/40">
                  <IconComponent className="w-4 h-4 text-white drop-shadow-lg" strokeWidth={2} />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
                </div>
              )}
            </div>

            {/* Full title with date */}
            <div className="text-white text-xs sm:text-sm leading-snug flex-1">{fullTitle}</div>
          </div>
        </DialogTrigger>

        <DialogContent className="!bg-[var(--primary)] !text-white">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center justify-center text-xl mb-2">
              <span>{mainTitle}</span>
              {dateSubtitle && <span className="text-base opacity-75 mt-1">{dateSubtitle}</span>}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {hasIcon && IconComponent && (
              <IconComponent className="w-16 h-16 text-white opacity-90" strokeWidth={2} />
            )}
            <p className="text-white text-center leading-relaxed">{description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </ScrollAnimation>
  );
}

export function AccomplishmentsTimeline() {
  const translate = useTranslations();
  const [accomplishments, setAccomplishments] = useState<Accomplishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccomplishments() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/users/${CurrentUser}/accomplishments`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `Failed to fetch accomplishments: ${response.statusText}`
          );
        }

        const data = await response.json();
        setAccomplishments(data.accomplishments || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load accomplishments');
      } finally {
        setLoading(false);
      }
    }

    fetchAccomplishments();
  }, []);

  // Sort accomplishments: oldest at bottom (last in array), newest at top (first in array)
  // API returns ascending, so we reverse to get newest first
  const sortedAccomplishments = useMemo(() => {
    return [...accomplishments].reverse();
  }, [accomplishments]);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <p className="text-white opacity-60">Loading accomplishments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (sortedAccomplishments.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      {/* Top gradient overlay to fade out cards near the top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-40" />

      {/* Bottom gradient overlay to fade out cards near the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-40" />

      <div className="flex flex-col items-center justify-start gap-2 w-full max-w-md px-4 sm:px-4 h-full pt-32 pb-8 mx-auto">
        {/* Dotted connecting line */}
        {sortedAccomplishments.length > 1 && (
          <div className="absolute left-1/2 top-32 bottom-8 w-0.5 -translate-x-1/2 pointer-events-none z-0">
            <div
              className="w-full h-full"
              style={{
                background:
                  'repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0px, rgba(255, 255, 255, 0.5) 8px, transparent 8px, transparent 16px)',
              }}
            />
          </div>
        )}

        {/* Accomplishment cards */}
        {sortedAccomplishments.map((accomplishment, index) => (
          <AccomplishmentCard
            key={accomplishment.id}
            accomplishment={accomplishment}
            index={index}
            translate={translate}
          />
        ))}
      </div>
    </div>
  );
}
