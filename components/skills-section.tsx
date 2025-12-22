'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillBadge } from '@/components/ui/skill-badge';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { CurrentUser } from '@/constants/current-user';
import { useEffect, useState } from 'react';
import type { SkillCategoryWithSkills } from '@/types/database';

export function SkillsSection() {
  const translate = useTranslations();
  const [skillCategories, setSkillCategories] = useState<SkillCategoryWithSkills[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/users/${CurrentUser}/skills`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || `Failed to fetch skills: ${response.statusText}`);
        }

        const data = await response.json();
        setSkillCategories(data.skill_categories || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError(err instanceof Error ? err.message : 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="relative z-20 px-4 flex items-center justify-center py-20">
        <p className="text-white">Loading skills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative z-20 px-4 flex flex-col items-center justify-center py-20 gap-2">
        <p className="text-red-400 font-semibold">Error loading skills:</p>
      </div>
    );
  }

  if (skillCategories.length === 0) {
    return (
      <div className="relative z-20 px-4 flex flex-col items-center justify-center py-20 gap-2">
        <p className="text-white opacity-60">No skills found</p>
      </div>
    );
  }

  return (
    <div className="relative z-20 px-4 flex flex-wrap justify-center gap-4 sm:gap-4">
      {skillCategories.map((category) => (
        <Card
          key={category.id}
          className="w-[90%] sm:w-[48%] lg:w-[30%] bg-[#233143] text-white shadow-xl"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-center">
              {translate(category.translation_key) || category.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 ps-2 pe-2">
              {category.skills.map((skill) => (
                <ScrollAnimation key={skill.id} animateOnce={false}>
                  <SkillBadge
                    name={translate('SKILLS.' + skill.skill_translation_key + '.TITLE')}
                    iconName={skill.skill_icon}
                    moreInfo={translate('SKILLS.' + skill.skill_translation_key + '.DESCRIPTION')}
                  />
                </ScrollAnimation>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
