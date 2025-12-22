'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CurrentUser } from '@/constants/current-user';
import type { AnalyticsStats } from '@/types/database';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { RadialBarChart, RadialBar, LabelList } from 'recharts';

// Blue color gradient from light to dark (matching the image)
const COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'];

export function AnalyticsSection() {
  const translate = useTranslations();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/users/${CurrentUser}/analytics`);

        if (!response.ok) {
          throw new Error(`Failed to fetch analytics: ${response.statusText}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <section className="relative w-full bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <p className="text-white opacity-60">Loading analytics...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="relative w-full bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <p className="text-red-400">Error loading analytics</p>
          </div>
        </div>
      </section>
    );
  }

  // Prepare chart data - each section will be a separate ring
  // Inner to outer: Hero, CV, Skills, Mountain
  const chartData = [
    {
      section: 'Hero',
      sectionKey: 'hero',
      label: translate('ANALYTICS.HERO'),
      labelWithValue: `${stats.percentages.hero}% ${translate('ANALYTICS.HERO')}`,
      value: stats.percentages.hero,
      count: stats.sections.hero,
      fill: COLORS[0],
    },
    {
      section: 'CV',
      sectionKey: 'cv',
      label: translate('ANALYTICS.CV'),
      labelWithValue: `${stats.percentages.cv}% ${translate('ANALYTICS.CV')}`,
      value: stats.percentages.cv,
      count: stats.sections.cv,
      fill: COLORS[1],
    },
    {
      section: 'Skills',
      sectionKey: 'skills',
      label: translate('ANALYTICS.SKILLS'),
      labelWithValue: `${stats.percentages.skills}% ${translate('ANALYTICS.SKILLS')}`,
      value: stats.percentages.skills,
      count: stats.sections.skills,
      fill: COLORS[2],
    },
    {
      section: 'Mountain',
      sectionKey: 'mountain',
      label: translate('ANALYTICS.ACHIEVEMENTS'),
      labelWithValue: `${stats.percentages.mountain}% ${translate('ANALYTICS.ACHIEVEMENTS')}`,
      value: stats.percentages.mountain,
      count: stats.sections.mountain,
      fill: COLORS[3],
    },
  ];

  const chartConfig = {
    value: {
      label: 'Percentage',
    },
    hero: {
      label: translate('ANALYTICS.HERO'),
      color: COLORS[0],
    },
    cv: {
      label: translate('ANALYTICS.CV'),
      color: COLORS[1],
    },
    skills: {
      label: translate('ANALYTICS.SKILLS'),
      color: COLORS[2],
    },
    mountain: {
      label: translate('ANALYTICS.ACHIEVEMENTS'),
      color: COLORS[3],
    },
  } satisfies ChartConfig;

  return (
    <section className="relative w-full bg-[#1a1a1a] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Total Visitors - Center */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-6xl md:text-7xl font-bold text-white mb-2">
              {stats.total_visitors}
            </div>
            <div className="text-xl md:text-2xl text-white opacity-80">
              {translate('ANALYTICS.TOTAL_VISITORS')}
            </div>
          </div>

          {/* Radial Bar Chart */}
          <div className="w-full max-w-4xl py-4 md:py-8 px-2 md:px-0">
            <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-4">
              {translate('ANALYTICS.CHART_TITLE')}
            </h3>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px] sm:max-h-[600px] md:max-h-[1000px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={-90}
                endAngle={380}
                innerRadius={30}
                outerRadius={110}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0] as any;
                    return (
                      <ChartTooltipContent>
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold">{data.payload.label}</div>
                          <div className="text-sm opacity-80">
                            {data.value}% ({data.payload.count} views)
                          </div>
                        </div>
                      </ChartTooltipContent>
                    );
                  }}
                />
                <RadialBar dataKey="value" background={{ fill: '#2a2a2a' }} cornerRadius={4}>
                  <LabelList
                    position="insideStart"
                    dataKey="labelWithValue"
                    className="fill-white"
                    fontSize={12}
                  />
                </RadialBar>
              </RadialBarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
