'use client';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from './dialog';
import { useState, useRef, useEffect } from 'react';
import { getIconByName } from '@/lib/icon-utils';
import type { LucideIcon } from 'lucide-react';

interface SkillBadgeProps {
  name: string;
  iconName: string;
  className?: string;
  moreInfo?: string;
}

export function SkillBadge({ name, iconName, className, moreInfo }: SkillBadgeProps) {
  const Icon: LucideIcon = getIconByName(iconName);
  const [isOpen, modalIsOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (!isOpen) {
      hoverTimeoutRef.current = setTimeout(() => {
        modalIsOpen(true);
      }, 2000);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleClick = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    modalIsOpen(true);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={modalIsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-2 p-4 rounded-lg',
            'bg-[#233143] border-2 border-gray-700',
            'shadow-md shadow-black/20',
            'hover:border-gray-500 hover:bg-[#2a3a4d] hover:shadow-lg hover:shadow-black/30',
            'active:scale-95 active:bg-[#1e2a38] active:border-gray-400',
            'active:shadow-inner',
            'touch-manipulation',
            'transition-all duration-200 ease-out',
            'cursor-pointer select-none',
            'min-h-[80px] min-w-[80px]',
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <Icon className="w-8 h-8 text-white opacity-90 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-white text-sm font-medium text-center">{name}</span>
        </div>
      </DialogTrigger>

      <DialogContent className="!bg-[var(--primary)] !text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-xl mb-4">
            {name}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Icon className="w-16 h-16 text-white opacity-90" />
          <p className="text-white text-center">
            {moreInfo || 'No additional information available.'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
