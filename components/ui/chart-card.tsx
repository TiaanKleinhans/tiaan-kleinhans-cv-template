// components/DashboardCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, description, children, className = '' }: ChartCardProps) {
  return (
    <Card
      className={`relative w-1/3 flex justify-center bg-[#233143] text-white shadow-xl ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center text-gray-300">{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}
