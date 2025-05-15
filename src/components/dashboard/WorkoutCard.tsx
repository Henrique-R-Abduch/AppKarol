
import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkoutCardProps {
  title: string;
  time: string;
  exercises: number;
  isToday?: boolean;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  time,
  exercises,
  isToday = false,
}) => {
  return (
    <Card className={`p-3 ${isToday ? 'border-l-4 border-l-fitness-purple' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base">{title}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{time} • {exercises} exercícios</span>
          </div>
        </div>
        <Button 
          variant={isToday ? "default" : "outline"} 
          size="sm" 
          className={isToday ? "h-7 py-0 bg-fitness-purple hover:bg-fitness-darkPurple text-xs" : "h-7 py-0 text-xs"}
        >
          {isToday ? "Iniciar" : "Ver"}
        </Button>
      </div>
    </Card>
  );
};

export default WorkoutCard;
