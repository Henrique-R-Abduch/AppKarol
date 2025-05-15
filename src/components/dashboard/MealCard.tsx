
import React from "react";
import { Card } from "@/components/ui/card";

interface MealCardProps {
  type: string;
  time: string;
  calories: number;
  completed: boolean;
  foods: Array<{ name: string; amount: string }>;
}

const MealCard: React.FC<MealCardProps> = ({
  type,
  time,
  calories,
  completed,
  foods,
}) => {
  return (
    <Card className="p-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-base">{type}</h3>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <div className="flex items-center">
          <span className="text-xs font-medium mr-2">{calories} kcal</span>
          <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center">
            {completed ? (
              <div className="h-3 w-3 bg-fitness-purple rounded-full" />
            ) : null}
          </div>
        </div>
      </div>
      <div className="space-y-0.5">
        {foods.map((food, index) => (
          <div key={index} className="text-xs flex justify-between">
            <span>{food.name}</span>
            <span className="text-gray-500">{food.amount}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MealCard;
