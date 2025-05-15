
import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface WorkoutFrequencyChartProps {
  data: Array<{
    day: string;
    frequency: number;
  }>;
}

const WorkoutFrequencyChart: React.FC<WorkoutFrequencyChartProps> = ({ data }) => {
  return (
    <Card className="p-4 h-full">
      <h3 className="text-base font-bold mb-2">Frequência Semanal</h3>
      <div className="grid grid-cols-7 gap-1 animate-fade-in h-[calc(100%-36px)] flex items-center">
        {data.map((day, index) => (
          <div 
            key={day.day} 
            className={`flex flex-col items-center ${index === new Date().getDay() ? 'relative' : ''}`}
          >
            <div 
              className={`
                h-10 w-10 rounded-full flex items-center justify-center mb-1
                ${day.frequency > 0 
                  ? 'bg-fitness-orange text-white' 
                  : 'bg-muted/30 text-muted-foreground'}
                ${index === new Date().getDay() ? 'ring-2 ring-fitness-orange ring-offset-2 ring-offset-background' : ''}
                transition-all duration-300 transform hover:scale-105
              `}
            >
              {day.frequency > 0 ? (
                <Check className="h-4 w-4" />
              ) : null}
            </div>
            <span className="text-xs font-medium">{day.day}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkoutFrequencyChart;
