
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Plus } from "lucide-react";
import { toast } from "sonner";

interface WaterConsumptionTrackerProps {
  initialValue?: number;
  dailyGoal?: number;
}

const WaterConsumptionTracker: React.FC<WaterConsumptionTrackerProps> = ({
  initialValue = 0,
  dailyGoal = 3.0,
}) => {
  const [consumption, setConsumption] = useState(initialValue);
  const [animate, setAnimate] = useState(false);
  
  // Preset water amounts in liters
  const waterAmounts = [0.1, 0.25, 0.5];
  
  // Calculate fill percentage
  const fillPercentage = Math.min((consumption / dailyGoal) * 100, 100);
  
  // Handle adding water
  const addWater = (amount: number) => {
    const newAmount = Math.min(consumption + amount, dailyGoal);
    setConsumption(newAmount);
    setAnimate(true);
    toast.success(`${amount}L de água adicionado`);
  };

  // Handle completing daily goal
  const completeGoal = () => {
    if (consumption >= dailyGoal) {
      toast.info("Meta já atingida!");
      return;
    }
    
    const remaining = dailyGoal - consumption;
    setConsumption(dailyGoal);
    setAnimate(true);
    toast.success(`${remaining.toFixed(1)}L de água adicionado. Meta atingida!`);
  };
  
  // Reset animation state
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animate]);
  
  // Get color based on progress
  const getColor = () => {
    if (fillPercentage < 30) return "#38BDF8";
    if (fillPercentage < 70) return "#60A5FA";
    return "#2563EB";
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-lg">Consumo de Água</h3>
        <div className="text-sm text-muted-foreground">
          Meta: {dailyGoal}L
        </div>
      </div>
      
      <div className="flex gap-5 items-center">
        {/* Bottle visualization container */}
        <div className="relative w-32 h-40 flex-shrink-0">
          {/* Bottle shape */}
          <div className="absolute inset-0 w-full h-full">
            {/* Bottle neck */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-5 rounded-t-md bg-fitness-lightGray z-10"></div>
            
            {/* Bottle body */}
            <div className="absolute top-5 w-full h-[calc(100%-5px)] bg-fitness-lightGray rounded-2xl overflow-hidden">
              {/* Water fill */}
              <div 
                className={`absolute bottom-0 w-full transition-all duration-500 ease-out ${animate ? 'animate-pulse' : ''}`}
                style={{
                  height: `${fillPercentage}%`,
                  background: `linear-gradient(to top, ${getColor()}, ${getColor()}90)`,
                  boxShadow: `0 0 10px ${getColor()}60`
                }}
              >
                {/* Water wave effect */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 animate-pulse"></div>
                
                {/* Water bubbles */}
                {animate && (
                  <>
                    <div className="absolute left-1/4 bottom-1/4 w-2 h-2 rounded-full bg-white/30 animate-ping"></div>
                    <div className="absolute left-2/3 bottom-1/2 w-1.5 h-1.5 rounded-full bg-white/30 animate-ping animation-delay-200"></div>
                    <div className="absolute left-1/2 bottom-3/4 w-1 h-1 rounded-full bg-white/30 animate-ping animation-delay-300"></div>
                  </>
                )}
              </div>
              
              {/* Level markers */}
              <div className="absolute inset-0 flex flex-col justify-between py-2">
                <div className="w-2 h-0.5 bg-white/20"></div>
                <div className="w-2 h-0.5 bg-white/20"></div>
                <div className="w-2 h-0.5 bg-white/20"></div>
                <div className="w-2 h-0.5 bg-white/20"></div>
              </div>
            </div>
          </div>
          
          {/* Current consumption */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="glass-morphism rounded-md px-2 py-1 text-white font-bold shadow-lg">
              {consumption.toFixed(1)}L
            </span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex-1 space-y-4">
          {/* Quick add buttons - now larger */}
          <div className="grid grid-cols-2 gap-2">
            {waterAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                className="flex items-center justify-center gap-2 h-12 font-medium"
                onClick={() => addWater(amount)}
              >
                <div className="flex items-center">
                  <Droplet className="w-4 h-4 mr-1 text-blue-400" />
                </div>
                <span>+{amount}L</span>
              </Button>
            ))}
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-12 col-span-2 font-medium bg-gradient-to-r from-blue-400/10 to-blue-500/10"
              onClick={completeGoal}
            >
              <Droplet className="w-4 h-4 mr-1 text-blue-400" fill="#38BDF8" />
              <span>Completar Meta</span>
              <span className="text-xs">({(dailyGoal - consumption).toFixed(1)}L)</span>
            </Button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-between text-sm">
            <span>{fillPercentage.toFixed(0)}% completo</span>
            <span className={fillPercentage >= 100 ? "text-green-500 font-medium" : "text-muted-foreground"}>
              {fillPercentage >= 100 ? "✓ Meta atingida!" : `Faltam: ${(dailyGoal - consumption).toFixed(1)}L`}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WaterConsumptionTracker;
