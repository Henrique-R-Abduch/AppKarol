
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Plus, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/navigation/BottomNav";

const Diet: React.FC = () => {
  const meals = [
    { 
      type: "Café da manhã", 
      time: "07:30", 
      completed: true,
      totalCalories: 420,
      macros: { protein: 25, carbs: 45, fat: 15 },
      foods: [
        { name: "Ovos mexidos", amount: "2 unid.", calories: 180 },
        { name: "Pão integral", amount: "2 fatias", calories: 160 },
        { name: "Café preto", amount: "200ml", calories: 10 },
        { name: "Banana", amount: "1 unid.", calories: 70 },
      ] 
    },
    { 
      type: "Almoço", 
      time: "12:30", 
      completed: false,
      totalCalories: 650,
      macros: { protein: 40, carbs: 60, fat: 20 },
      foods: [
        { name: "Peito de frango", amount: "150g", calories: 250 },
        { name: "Arroz integral", amount: "100g", calories: 170 },
        { name: "Brócolis", amount: "100g", calories: 55 },
        { name: "Azeite de oliva", amount: "1 colher", calories: 120 },
        { name: "Bebida", amount: "Água", calories: 0 },
      ] 
    },
    { 
      type: "Lanche", 
      time: "15:30", 
      completed: false,
      totalCalories: 300,
      macros: { protein: 20, carbs: 30, fat: 10 },
      foods: [
        { name: "Whey protein", amount: "1 scoop", calories: 120 },
        { name: "Aveia", amount: "30g", calories: 110 },
        { name: "Maçã", amount: "1 unid.", calories: 70 },
      ] 
    },
  ];

  const nutritionSummary = {
    calories: {
      consumed: 1370,
      goal: 2200,
      percentage: (1370 / 2200) * 100
    },
    macros: {
      protein: { consumed: 85, goal: 140 },
      carbs: { consumed: 135, goal: 250 },
      fat: { consumed: 45, goal: 70 }
    }
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-8 pb-5 bg-white">
        <h1 className="text-2xl font-bold mb-4">Dieta</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar alimentos" className="pl-10 fitness-input" />
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="px-5 mt-6">
        <h2 className="font-semibold text-lg mb-3">Resumo nutricional</h2>
        <Card className="fitness-card mb-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm text-gray-500">Calorias consumidas</span>
              <div className="flex items-end">
                <span className="text-2xl font-bold">{nutritionSummary.calories.consumed}</span>
                <span className="text-sm text-gray-500 ml-1">/ {nutritionSummary.calories.goal} kcal</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Restantes</span>
              <div className="font-medium">{nutritionSummary.calories.goal - nutritionSummary.calories.consumed} kcal</div>
            </div>
          </div>
          <Progress 
            value={nutritionSummary.calories.percentage} 
            className="h-2 mb-4"
            style={{ 
              backgroundColor: "#F3F4F6",
              ["--progress-background" as any]: "#8B5CF6" 
            }}
          />
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Proteínas</span>
              <div className="font-medium">
                {nutritionSummary.macros.protein.consumed}
                <span className="text-xs text-gray-500"> / {nutritionSummary.macros.protein.goal}g</span>
              </div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Carbos</span>
              <div className="font-medium">
                {nutritionSummary.macros.carbs.consumed}
                <span className="text-xs text-gray-500"> / {nutritionSummary.macros.carbs.goal}g</span>
              </div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Gorduras</span>
              <div className="font-medium">
                {nutritionSummary.macros.fat.consumed}
                <span className="text-xs text-gray-500"> / {nutritionSummary.macros.fat.goal}g</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Meals */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Refeições de hoje</h2>
          <div className="flex">
            <Button variant="ghost" size="sm" className="h-8 mr-1">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              <span className="text-xs">Ordenar</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              <span className="text-xs">Adicionar</span>
            </Button>
          </div>
        </div>

        <div className="space-y-5">
          {meals.map((meal, mealIndex) => (
            <Card key={mealIndex} className="fitness-card">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-medium">{meal.type}</h3>
                  <span className="text-sm text-gray-500">{meal.time}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3">{meal.totalCalories} kcal</span>
                  <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                    {meal.completed ? (
                      <div className="h-4 w-4 bg-fitness-purple rounded-full" />
                    ) : null}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex justify-between py-1 text-sm">
                    <div className="flex-1">
                      <span>{food.name}</span>
                      <span className="text-gray-500 ml-2">({food.amount})</span>
                    </div>
                    <span>{food.calories} kcal</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                <Button variant="ghost" size="sm" className="text-xs text-fitness-purple">
                  <Plus className="h-3 w-3 mr-1" />
                  Adicionar alimento
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Editar refeição
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Diet;
