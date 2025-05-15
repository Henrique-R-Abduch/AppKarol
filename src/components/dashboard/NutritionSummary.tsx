
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";

interface NutritionData {
  calories: {
    consumed: number;
    goal: number;
  };
  macros: {
    protein: { consumed: number; goal: number };
    carbs: { consumed: number; goal: number };
    fat: { consumed: number; goal: number };
  };
}

interface NutritionSummaryProps {
  data: NutritionData;
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ data }) => {
  const isMobile = useIsMobile();
  
  const caloriePercentage = (data.calories.consumed / data.calories.goal) * 100;
  const proteinPercentage = (data.macros.protein.consumed / data.macros.protein.goal) * 100;
  const carbsPercentage = (data.macros.carbs.consumed / data.macros.carbs.goal) * 100;
  const fatPercentage = (data.macros.fat.consumed / data.macros.fat.goal) * 100;

  // Calculate sizes based on mobile or desktop
  const circleSize = isMobile ? "100px" : "130px";
  const cardPadding = isMobile ? "p-3" : "p-4";
  const macroPadding = isMobile ? "p-2" : "p-3";
  const macroGap = isMobile ? "gap-2" : "gap-3";
  const textSize = isMobile ? "text-lg" : "text-xl";
  const verticalSpacing = isMobile ? "gap-3" : "gap-6";
  const macroTextSize = isMobile ? "text-xs" : "text-sm";
  const macroTitleSize = isMobile ? "text-[10px]" : "text-xs";

  return (
    <Card className={`${cardPadding}`}>

      <h3 className={`font-bold text-lg ${isMobile ? "mb-2" : "mb-3"}`}>Nutrição Diária</h3>
      
      <div className={`flex flex-col md:flex-row items-center justify-between ${verticalSpacing}`}>


        {/* Circular Calories Progress */}
        <div className="relative flex-shrink-0 mx-auto md:mx-0" style={{ width: circleSize, height: circleSize }}>
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Progress circle with gradient */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#calorieGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - caloriePercentage / 100)}`}
              transform="rotate(-90 50 50)"
              className="transition-all duration-500 ease-in-out"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D946EF" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Centered text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`${textSize} font-bold`}>{data.calories.consumed}</span>
            <span className="text-xs text-muted-foreground">/ {data.calories.goal} kcal</span>
          </div>
        </div>
        
        {/* Macros Grid */}
        <div className={`grid grid-cols-3 ${macroGap} w-full`}>
          {/* Protein */}
          <div className={`rounded-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-transparent border border-border/50 ${macroPadding} shadow-sm`}>
            <div className={`${macroTitleSize} text-muted-foreground mb-0.5`}>Proteínas</div>
            <div className={`font-medium ${macroTextSize} mb-0.5`}>
              {data.macros.protein.consumed}g
              <span className="text-xs text-muted-foreground"> / {data.macros.protein.goal}g</span>
            </div>
            <Progress 
              value={proteinPercentage} 
              className="h-1.5"
              style={{ ["--progress-background" as any]: "#4ADE80" }}
            />
          </div>
          
          {/* Carbs */}
          <div className={`rounded-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-transparent border border-border/50 ${macroPadding} shadow-sm`}>
            <div className={`${macroTitleSize} text-muted-foreground mb-0.5`}>Carboidratos</div>
            <div className={`font-medium ${macroTextSize} mb-0.5`}>
              {data.macros.carbs.consumed}g
              <span className="text-xs text-muted-foreground"> / {data.macros.carbs.goal}g</span>
            </div>
            <Progress 
              value={carbsPercentage} 
              className="h-1.5"
              style={{ ["--progress-background" as any]: "#38BDF8" }}
            />
          </div>
          
          {/* Fat */}
          <div className={`rounded-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-transparent border border-border/50 ${macroPadding} shadow-sm`}>
            <div className={`${macroTitleSize} text-muted-foreground mb-0.5`}>Gorduras</div>
            <div className={`font-medium ${macroTextSize} mb-0.5`}>
              {data.macros.fat.consumed}g
              <span className="text-xs text-muted-foreground"> / {data.macros.fat.goal}g</span>
            </div>
            <Progress 
              value={fatPercentage} 
              className="h-1.5"
              style={{ ["--progress-background" as any]: "#FB923C" }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NutritionSummary;
