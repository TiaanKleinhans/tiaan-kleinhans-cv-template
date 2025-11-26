'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TooltipProps } from 'recharts';

export interface RadarDataPoint {
  [key: string]: string | number;
}

interface ReusableRadarChartProps {
  data: RadarDataPoint[];
  angleKey: string; // ex: "work"
  dataKey: string; // ex: "workValue"
  radiusDomain?: [number, number];
  strokeColor?: string;
  fillColor?: string;
  fillOpacity?: number;
}

const CleanRadarTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;

  return (
    <div className="rounded bg-black/70 px-3 py-2 text-white text-sm shadow">
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  );
};

/* ---------------------------------------------
 * Chart Component
 * --------------------------------------------- */
export function ReusableRadarChart({
  data,
  angleKey,
  dataKey,
  radiusDomain = [0, 10],
  strokeColor = 'var(--white)',
  fillColor = 'var(--white)',
  fillOpacity = 0.5,
}: ReusableRadarChartProps) {
  return (
    <div className="w-full">
      <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="65%"
            data={data}
            margin={{ top: 30, bottom: 30, left: 20, right: 20 }}
          >
            <PolarGrid stroke="#B0B8C1" strokeOpacity={0.5} gridType="polygon" radialLines />

            <PolarAngleAxis dataKey={angleKey} tick={{ fill: '#ccc', fontSize: 12 }} />

            <PolarRadiusAxis angle={65} domain={radiusDomain} stroke="#B0B8C1" tickCount={5} />

            {/* ⭐ Clean & simple tooltip */}
            <Tooltip content={<CleanRadarTooltip />} />

            <Radar
              dataKey={dataKey}
              stroke={strokeColor}
              fill={fillColor}
              fillOpacity={fillOpacity}
              dot
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
