'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface Translation {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  totalDownloads: number;
}

// Blue color gradient consistent with analytics section
const COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'];

export function LanguageDownloadsChart() {
  const translate = useTranslations();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTranslations() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/translations/available');

        if (!response.ok) {
          throw new Error(`Failed to fetch translations: ${response.statusText}`);
        }

        const data = await response.json();
        setTranslations(data.translations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load downloads');
      } finally {
        setLoading(false);
      }
    }

    fetchTranslations();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-4">
          {translate('ANALYTICS.DOWNLOADS_CHART_TITLE')}
        </h3>
        <div className="flex items-center justify-center h-[300px] w-full">
          <p className="text-white opacity-60">Loading downloads...</p>
        </div>
      </div>
    );
  }

  if (error || !translations.length) {
    return (
      <div className="w-full flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-4">
          {translate('ANALYTICS.DOWNLOADS_CHART_TITLE')}
        </h3>
        <div className="flex items-center justify-center h-[300px] w-full">
          <p className="text-white">{error || 'No download data available'}</p>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = translations.map((translation, index) => ({
    code: translation.code,
    name: translation.name,
    downloads: translation.totalDownloads || 0,
    fill: COLORS[index % COLORS.length],
  }));

  // Create chart config with language codes as keys
  const chartConfig: ChartConfig = translations.reduce(
    (config, translation, index) => {
      config[translation.code] = {
        label: translation.name,
        color: COLORS[index % COLORS.length],
      };
      return config;
    },
    {} as ChartConfig
  );

  // Add downloads key
  chartConfig.downloads = {
    label: translate('ANALYTICS.DOWNLOADS_LABEL'),
  };

  // Find the bar with the highest value for activeIndex
  const maxDownloads = Math.max(...chartData.map((d) => d.downloads));
  const activeIndex = chartData.findIndex((d) => d.downloads === maxDownloads);

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-xl md:text-2xl font-semibold text-white text-center mb-4">
        {translate('ANALYTICS.DOWNLOADS_CHART_TITLE')}
      </h3>
      <div className="w-full flex justify-center">
        <ChartContainer config={chartConfig} className="w-full max-w-full h-[300px] max-h-[500px] lg:max-h-[600px]">
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid vertical={false} stroke="#ffffff" strokeOpacity={0.1} />
          <XAxis
            dataKey="code"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{ fill: '#ffffff', fontSize: 12 }}
            tickFormatter={(value) => {
              const translation = translations.find((t) => t.code === value);
              return translation?.name || value;
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#ffffff', fontSize: 12 }}
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload as typeof chartData[0];
              return (
                <div className="rounded bg-black/90 px-3 py-2 text-white text-sm shadow border border-white/20">
                  <div className="font-semibold">{data.name}</div>
                  <div className="text-white/80">
                    {translate('ANALYTICS.DOWNLOADS_LABEL')}: {data.downloads}
                  </div>
                </div>
              );
            }}
          />
          <Bar
            dataKey="downloads"
            strokeWidth={2}
            radius={8}
            activeIndex={activeIndex >= 0 ? activeIndex : undefined}
          />
        </BarChart>
      </ChartContainer>
      </div>
    </div>
  );
}

