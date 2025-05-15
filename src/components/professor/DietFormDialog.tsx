
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, MinusCircle } from "lucide-react";
import { toast } from "sonner";

interface DietFormDialogProps {
  student: {
    id: number;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MealItem {
  id: string;
  time: string;
  name: string;
  foods: string;
  macros: {
    protein: string;
    carbs: string;
    fat: string;
  };
}

const DietFormDialog: React.FC<DietFormDialogProps> = ({
  student,
  open,
  onOpenChange,
}) => {
  const [dietName, setDietName] = useState("");
  const [dietDescription, setDietDescription] = useState("");
  const [meals, setMeals] = useState<MealItem[]>([
    {
      id: "1",
      time: "07:00",
      name: "Café da Manhã",
      foods: "",
      macros: {
        protein: "",
        carbs: "",
        fat: "",
      },
    },
  ]);

  const addMeal = () => {
    setMeals([
      ...meals,
      {
        id: Date.now().toString(),
        time: "",
        name: "",
        foods: "",
        macros: {
          protein: "",
          carbs: "",
          fat: "",
        },
      },
    ]);
  };

  const removeMeal = (id: string) => {
    if (meals.length > 1) {
      setMeals(meals.filter((meal) => meal.id !== id));
    }
  };

  const updateMeal = (id: string, field: keyof MealItem, value: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id ? { ...meal, [field]: value } : meal
      )
    );
  };

  const updateMacro = (id: string, macro: keyof MealItem["macros"], value: string) => {
    setMeals(
      meals.map((meal) =>
        meal.id === id
          ? { ...meal, macros: { ...meal.macros, [macro]: value } }
          : meal
      )
    );
  };

  const handleSubmit = () => {
    // Here we would typically save the diet to a database
    // For now we'll just show a success message
    toast.success(`Dieta cadastrada para ${student.name}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Dieta - {student.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="diet-name">Nome da Dieta</Label>
              <Input
                id="diet-name"
                placeholder="ex: Dieta de Cutting"
                value={dietName}
                onChange={(e) => setDietName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet-description">Descrição (opcional)</Label>
              <Textarea
                id="diet-description"
                placeholder="Instruções gerais para a dieta..."
                value={dietDescription}
                onChange={(e) => setDietDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Refeições</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMeal}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {meals.map((meal) => (
              <div key={meal.id} className="space-y-3 p-3 border rounded-md">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`meal-time-${meal.id}`}>Horário</Label>
                    <Input
                      id={`meal-time-${meal.id}`}
                      type="time"
                      value={meal.time}
                      onChange={(e) =>
                        updateMeal(meal.id, "time", e.target.value)
                      }
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`meal-name-${meal.id}`}>Refeição</Label>
                    <Input
                      id={`meal-name-${meal.id}`}
                      placeholder="ex: Café da Manhã"
                      value={meal.name}
                      onChange={(e) =>
                        updateMeal(meal.id, "name", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`meal-foods-${meal.id}`}>Alimentos</Label>
                  <Textarea
                    id={`meal-foods-${meal.id}`}
                    placeholder="ex: 2 ovos, 1 fatia de pão integral, 30g de queijo branco..."
                    value={meal.foods}
                    onChange={(e) =>
                      updateMeal(meal.id, "foods", e.target.value)
                    }
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor={`meal-protein-${meal.id}`}>
                      Proteínas (g)
                    </Label>
                    <Input
                      id={`meal-protein-${meal.id}`}
                      type="text"
                      placeholder="ex: 20g"
                      value={meal.macros.protein}
                      onChange={(e) =>
                        updateMacro(meal.id, "protein", e.target.value)
                      }
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`meal-carbs-${meal.id}`}>
                      Carboidratos (g)
                    </Label>
                    <Input
                      id={`meal-carbs-${meal.id}`}
                      type="text"
                      placeholder="ex: 30g"
                      value={meal.macros.carbs}
                      onChange={(e) =>
                        updateMacro(meal.id, "carbs", e.target.value)
                      }
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`meal-fat-${meal.id}`}>
                      Gorduras (g)
                    </Label>
                    <Input
                      id={`meal-fat-${meal.id}`}
                      type="text"
                      placeholder="ex: 10g"
                      value={meal.macros.fat}
                      onChange={(e) =>
                        updateMacro(meal.id, "fat", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMeal(meal.id)}
                    disabled={meals.length === 1}
                  >
                    <MinusCircle className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Salvar Dieta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DietFormDialog;
