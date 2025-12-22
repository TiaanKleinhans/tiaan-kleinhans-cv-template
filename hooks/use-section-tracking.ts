'use client';

import { useEffect, useRef, useState } from 'react';
import { CurrentUser } from '@/constants/current-user';

type SectionName = 'hero' | 'cv' | 'skills' | 'mountain';

interface UseSectionTrackingOptions {
  sections: {
    hero?: string;
    cv?: string;
    skills?: string;
    mountain?: string;
  };
}

export function useSectionTracking({ sections }: UseSectionTrackingOptions) {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const viewedSections = useRef<Set<SectionName>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Create visitor on mount
  useEffect(() => {
    async function createVisitor() {
      try {
        const response = await fetch('/api/analytics/track-visitor', {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          setVisitorId(data.visitor_id);
        }
      } catch (error) {
        // Silently fail - don't break the page if analytics fail
        console.error('Failed to create visitor:', error);
      }
    }

    createVisitor();
  }, []);

  // Track section views
  useEffect(() => {
    if (!visitorId) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            let sectionName: SectionName | null = null;

            // Map section IDs to section names
            if (sectionId === sections.hero) sectionName = 'hero';
            else if (sectionId === sections.cv) sectionName = 'cv';
            else if (sectionId === sections.skills) sectionName = 'skills';
            else if (sectionId === sections.mountain) sectionName = 'mountain';

            if (sectionName && !viewedSections.current.has(sectionName)) {
              viewedSections.current.add(sectionName);
              trackSectionView(sectionName);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
      }
    );

    // Observe all sections
    Object.values(sections).forEach((sectionId) => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          observerRef.current?.observe(element);
        }
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [visitorId, sections]);

  async function trackSectionView(sectionName: SectionName) {
    if (!visitorId) return;

    try {
      await fetch('/api/analytics/track-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitor_id: visitorId,
          section_name: sectionName,
        }),
      });
    } catch (error) {
      // Silently fail - don't break the page if analytics fail
      console.error(`Failed to track section ${sectionName}:`, error);
    }
  }
}

