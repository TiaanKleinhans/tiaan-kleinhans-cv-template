// 'use client';

// import {
//   Radar,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { work: 'Conflict Resolution', personality: 'Confidence', workValue: 3, personalityValue: 2 },
//   { work: 'Team Orientation', personality: 'Openness', workValue: 5, personalityValue: 3 },
//   { work: 'Leadership', personality: 'Adaptability', workValue: 7, personalityValue: 7 },
//   { work: 'Mentorship', personality: 'Self-Awareness', workValue: 2, personalityValue: 1 },
//   { work: 'Networking', personality: 'Motivation', workValue: 2, personalityValue: 1 },
//   { work: 'Humility', personality: 'Trustworthiness', workValue: 2, personalityValue: 1 },
//   { work: 'Decision-Making', personality: 'Respectfulness', workValue: 2, personalityValue: 1 },
// ];

// export function RadarChartDots() {
//   return (
//     <div className="w-full">
//       <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <RadarChart
//             cx="50%"
//             cy="50%"
//             outerRadius="65%"
//             data={data}
//             margin={{ top: 30, bottom: 30, left: 20, right: 20 }}
//           >
//             {/* GRID */}
//             <PolarGrid stroke="#7f5af0" strokeOpacity={1} gridType="polygon" radialLines={true} />

//             {/* LABELS */}
//             <PolarAngleAxis dataKey="work" tick={{ fill: '#ccc', fontSize: 12 }} />

//             {/* RADIUS */}
//             <PolarRadiusAxis angle={65} domain={[0, 10]} />

//             {/* DATA */}
//             <Radar
//               dataKey="workValue"
//               stroke="#82a6aa"
//               fill="#82a6aa"
//               fillOpacity={0.5}
//               dot={true}
//             />
//           </RadarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export interface RadarDataPoint {
  [key: string]: string | number;
}

interface ReusableRadarChartProps {
  data: RadarDataPoint[];

  /** the label key, ex: "work" */
  angleKey: string;

  /** the numeric value key, ex: "workValue" */
  dataKey: string;

  /** domain of the radius, default [0,10] */
  radiusDomain?: [number, number];

  /** visual styling */
  strokeColor?: string;
  fillColor?: string;
  fillOpacity?: number;
}

export function ReusableRadarChart({
  data,
  angleKey,
  dataKey,
  radiusDomain = [0, 10],
  strokeColor = '#82a6aa',
  fillColor = '#82a6aa',
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
            <PolarGrid stroke="#7f5af0" strokeOpacity={1} gridType="polygon" radialLines />

            <PolarAngleAxis dataKey={angleKey} tick={{ fill: '#ccc', fontSize: 12 }} />

            <PolarRadiusAxis angle={65} domain={radiusDomain} />

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
