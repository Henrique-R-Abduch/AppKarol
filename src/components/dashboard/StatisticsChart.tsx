
import React from "react";
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface StatisticsChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color: string;
  valueFormatter?: (value: number) => string;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({
  title,
  data,
  color,
  valueFormatter = (value) => `${value}`,
}) => {
  const chartConfig = {
    data: {
      label: "Dados",
      theme: {
        light: color,
        dark: color,
      },
    },
  };

  return (
    <Card className="p-3">
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      <div className="h-[160px]">
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                tickLine={{ stroke: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--muted-foreground)' }}
              />
              <YAxis 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                tickLine={{ stroke: 'var(--muted-foreground)' }}
                axisLine={{ stroke: 'var(--muted-foreground)' }}
                tickFormatter={valueFormatter}
              />
              <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
              <Area 
                type="monotone" 
                dataKey="value"
                stroke={color} 
                fillOpacity={1}
                fill={`url(#gradient-${title.replace(/\s+/g, '')})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  valueFormatter?: (value: number) => string;
}

const CustomTooltip = ({ active, payload, label, valueFormatter }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-morphism p-1.5 rounded-md">
        <p className="text-xs font-medium">{`${label}`}</p>
        <p className="text-xs text-fitness-purple">
          {valueFormatter ? valueFormatter(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export default StatisticsChart;
