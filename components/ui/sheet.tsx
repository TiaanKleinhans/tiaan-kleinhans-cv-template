'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
}

function Sheet({ open, onOpenChange, children, side = 'right' }: SheetProps) {
  const [shouldRender, setShouldRender] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const sideClasses = {
    right: cn('top-0 right-0 h-full', open ? 'translate-x-0' : 'translate-x-full'),
    left: cn('top-0 left-0 h-full', open ? '-translate-x-0' : '-translate-x-full'),
    top: cn('top-0 left-0 w-full', open ? '-translate-y-0' : '-translate-y-full'),
    bottom: cn('bottom-0 left-0 w-full', open ? 'translate-y-0' : 'translate-y-full'),
  };

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[99] bg-black/50 transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          'fixed z-[100] bg-[var(--primary)] text-white shadow-lg transition-transform duration-300 ease-in-out',
          'w-[300px]',
          sideClasses[side]
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-end p-4 border-b border-white/10">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>
    </>
  );
}

export { Sheet };
