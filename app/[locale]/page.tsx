'use client';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

import Image from 'next/image';
import { CurrentUser } from '@/constants/current-user';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartCard } from '@/components/ui/chart-card';
import { ReusableRadarChart } from '@/components/ui/radar-chart';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SkillsSection } from '@/components/skills-section';
import { AccomplishmentsTimeline } from '@/components/accomplishments-timeline';
import { AnalyticsSection } from '@/components/analytics-section';
import {
  CorePersonalQualitiesConstant,
  CoreProfessionalCompetenciesConstant,
} from '@/constants/chart-data';
import { useEffect, useState, useRef } from 'react';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { useSectionTracking } from '@/hooks/use-section-tracking';
import { SettingsMenu } from '@/components/settings-menu';

type User = {
  id: string;
  name: string;
  surname: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  linkedIn?: string;
  gitHub?: string;
};

interface Translation {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  totalDownloads: number;
}

export default function HomePage() {
  const translate = useTranslations();
  const userId = CurrentUser;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableTranslations, setAvailableTranslations] = useState<Translation[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const personalQualitiesConstant = CorePersonalQualitiesConstant.map((_) => ({
    key: translate(_.key),
    value: _.value,
  }));

  const professionalCompetencies = CoreProfessionalCompetenciesConstant.map((_) => ({
    key: translate(_.key),
    value: _.value,
  }));

  useSectionTracking({
    sections: {
      hero: 'hero-section',
      cv: 'cv-section',
      skills: 'skills-section',
      mountain: 'mountain-section',
    },
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          }
          console.error('API Error Response:', errorData);
          throw new Error(
            errorData.error || `Failed to fetch user: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchTranslations() {
      try {
        const response = await fetch('/api/translations/available');
        if (response.ok) {
          const data = await response.json();
          setAvailableTranslations(data.translations || []);
        }
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    }

    if (userId) {
      fetchUser();
    } else {
      setLoading(false);
    }
    fetchTranslations();
  }, [userId]);

  // Cleanup toast timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[var(--primary)]">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4"> {translate('ERROR.SOMETHING_WENT_WRONG')}</h1>
          <p>{translate('ERROR.USER_NOT_FOUND')} Kleinhanstiaan89@gmail.com</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black">
      <SettingsMenu />
      <section
        id="hero-section"
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        <Image
          src="/images/intro-me.png"
          alt="Top background"
          fill
          className="opacity-90 object-cover [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
        />
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-[5]">
          <div className="w-full h-40 md:h-50 bg-black/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center text-white">
          <ScrollAnimation>
            <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-[2px_2px_0px_black]">
              {user.name}
              <br />
              {user.surname}
            </h1>
            <h2 className="mt-4 text-xl opacity-90">{translate('INTRODUCTION.ROLE')}</h2>
          </ScrollAnimation>
        </div>
      </section>
      <section
        id="cv-section"
        className="pb-0 md:pb-0 lg:pb-0 relative w-full   from-[#1a1a1a] via-black to-black"
      >
        <ScrollAnimation>
          <div className="relative w-full flex justify-center z-20 [mask-image:linear-gradient(to_top,black_0 %,transparent)]">
            <div className="w-[90%] md:w-[55%] bg-[var(--primary)] p-12 rounded-lg shadow-2xl text-white text-center">
              <h2 className="opacity-90 mb-6">{translate('CV.TITLE')}</h2>
              <h2 className="opacity-90 mb-6">{translate('CV.HEADER')}</h2>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <ScrollAnimation animateOnce={false}>
                  <DialogTrigger className="border border-green-400 px-6 py-2 rounded text-green-400 hover:bg-green-400 hover:text-black transition">
                    {translate('CV.DOWNLOAD_CV')}
                  </DialogTrigger>
                </ScrollAnimation>

                <DialogContent className="!bg-[var(--primary)] !text-white">
                  <ScrollAnimation delay={0.2}>
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-center">
                        {translate('CV.MODAL.HEADER')}
                      </DialogTitle>
                    </DialogHeader>
                  </ScrollAnimation>

                  <ScrollAnimation delay={0.4}>
                    <Table>
                      <TableHeader>
                        <TableRow className="pt-2 pb-0 flex items-center justify-center">
                          <TableHead className="!text-white">
                            {translate('CV.MODAL.LANGUAGE')}
                          </TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {availableTranslations.map((_, index) => {
                          const handleDownload = async (e: React.MouseEvent) => {
                            e.preventDefault();

                            // Close dialog
                            setDialogOpen(false);

                            // Show toast
                            setShowToast(true);

                            try {
                              // Increment download count
                              await fetch(`/api/translations/${_.code}/increment-download`, {
                                method: 'POST',
                              });
                            } catch (error) {
                              console.error('Error tracking download:', error);
                            }

                            // Clear any existing timeout
                            if (toastTimeoutRef.current) {
                              clearTimeout(toastTimeoutRef.current);
                            }

                            // Trigger actual download
                            const link = document.createElement('a');
                            link.href = `/files/Tiaan-Kleinhans-${_.code}.zip`;
                            link.download = `Tiaan-Kleinhans-${_.code}.zip`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            // Hide toast after 2 seconds
                            toastTimeoutRef.current = setTimeout(() => {
                              setShowToast(false);
                              toastTimeoutRef.current = null;
                            }, 2000);
                          };

                          return (
                            <TableRow
                              key={_.code}
                              className="border-b border-gray-300 hover:bg-gray-900 cursor-pointer"
                              onClick={handleDownload}
                            >
                              <TableCell className="flex items-center justify-center font-medium">
                                {_.name}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </ScrollAnimation>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      <section className="relative w-full py-10 overflow-hidden">
        <Image
          src="/images/fibre-optic.jpg"
          alt="Top background"
          fill
          className="opacity-100 object-cover [mask-image:linear-gradient(to_top,black_80%,transparent)] [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
        />
        <ScrollAnimation animateOnce={false}>
          <div className="relative z-20 flex flex-wrap justify-center gap-4 sm:gap-4">
            <ChartCard
              title={translate('CHARTS.CORE_PROFESSIONAL_COMPETENCIES.TITLE')}
              className="w-[80%] sm:w-[48%] lg:w-[42%]"
            >
              <ReusableRadarChart
                data={professionalCompetencies}
                angleKey="key"
                dataKey="value"
                radiusDomain={[0, 10]}
                strokeColor="var(--white)"
                fillColor="var(--white)"
              />
            </ChartCard>

            <ChartCard
              title={translate('CHARTS.CORE_PERSONAL_QUALITIES.TITLE')}
              className="w-[80%] sm:w-[48%] lg:w-[42%]"
            >
              <ReusableRadarChart
                data={personalQualitiesConstant}
                angleKey="key"
                dataKey="value"
                radiusDomain={[0, 10]}
                strokeColor="var(--white)"
                fillColor="var(--white)"
              />
            </ChartCard>
          </div>
        </ScrollAnimation>
      </section>

      <section id="skills-section" className="relative w-full bg-black py-16">
        <SkillsSection />
      </section>

      <section id="mountain-section" className="relative w-full h-screen overflow-hidden">
        <Image
          src="/images/progress-mountain.jpg"
          alt="Bottom background"
          fill
          className="
    object-cover
    [mask-image:linear-gradient(to_top,black_80%,transparent)]
   
  "
        />
        <div className="absolute top-0 left-0 right-0 z-20 flex flex-col items-center justify-center pt-4 md:pt-6 px-4">
          <ScrollAnimation>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] text-center">
              {translate('MOUNTAIN_SECTION.HEADER')}
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white opacity-90 italic text-center drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]">
              {translate('MOUNTAIN_SECTION.QUOTE')}
            </p>
          </ScrollAnimation>
        </div>
        <AccomplishmentsTimeline />
      </section>

      <AnalyticsSection />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:top-8 md:right-8 md:translate-x-0 z-[200] bg-[var(--primary)] text-white px-6 py-3 rounded-lg shadow-lg border border-white/20 animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-top-4 duration-300 flex items-center gap-3">
          <CheckCircle2 className="w-[1.375rem] h-[1.375rem] text-[var(--secondary)] animate-in zoom-in duration-300" />
          <p className="text-white font-medium">{translate('CV.DOWNLOAD_TOAST')}</p>
        </div>
      )}
    </div>
  );
}
