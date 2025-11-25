'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { month: 'data', visitors: 3 },
  { month: 'data', visitors: 3 },
  { month: 'data', visitors: 3 },
  { month: 'data', visitors: 3 },
];

export function RadarChartDots() {
  return (
    <CardContent className="p-6">
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="month" />
            <PolarRadiusAxis angle={75} domain={[0, 10]} />

            <Radar
              name="Visitors"
              dataKey="visitors"
              stroke="#82a6ff"
              fill="#82a6ff"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  );
}
