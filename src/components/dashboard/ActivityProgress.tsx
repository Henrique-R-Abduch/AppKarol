
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface ActivityProgressProps {
  title: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

const ActivityProgress: React.FC<ActivityProgressProps> = ({
  title,
  current,
  goal,
  unit,
  color,
}) => {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  
  return (
    <Card className="p-4">
      <div className="flex flex-col mb-2.5">
        <span className="text-sm text-gray-500 mb-1">{title}</span>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {current} <span className="text-xs font-normal">{unit}</span>
          </span>
          <span className="text-xs text-gray-500">Meta: {goal} {unit}</span>
        </div>
      </div>
      <Progress 
        value={percentage} 
        className="h-2"
        style={{ 
          backgroundColor: "#2D2A35",
          ["--progress-background" as any]: color 
        }}
      />
    </Card>
  );
};

export default ActivityProgress;
