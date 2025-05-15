
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

interface WorkoutFormDialogProps {
  student: {
    id: number;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ExerciseItem {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
}

const WorkoutFormDialog: React.FC<WorkoutFormDialogProps> = ({
  student,
  open,
  onOpenChange,
}) => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { id: "1", name: "", sets: 3, reps: "12", rest: "60s" },
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(),
        name: "",
        sets: 3,
        reps: "12",
        rest: "60s",
      },
    ]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((exercise) => exercise.id !== id));
    }
  };

  const updateExercise = (id: string, field: keyof ExerciseItem, value: string | number) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleSubmit = () => {
    // Here we would typically save the workout to a database
    // For now we'll just show a success message
    toast.success(`Treino cadastrado para ${student.name}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Treino - {student.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="workout-name">Nome do Treino</Label>
              <Input
                id="workout-name"
                placeholder="ex: Treino A - Peito e Costas"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workout-description">Descrição (opcional)</Label>
              <Textarea
                id="workout-description"
                placeholder="Instruções gerais para o treino..."
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Exercícios</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExercise}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>

            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <div className="col-span-4">
                  <Input
                    placeholder="Nome do exercício"
                    value={exercise.name}
                    onChange={(e) =>
                      updateExercise(exercise.id, "name", e.target.value)
                    }
                  />
                </div>
                
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Séries"
                    value={exercise.sets}
                    min={1}
                    onChange={(e) =>
                      updateExercise(exercise.id, "sets", parseInt(e.target.value) || 1)
                    }
                  />
                </div>
                
                <div className="col-span-2">
                  <Input
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) =>
                      updateExercise(exercise.id, "reps", e.target.value)
                    }
                  />
                </div>
                
                <div className="col-span-2">
                  <Input
                    placeholder="Descanso"
                    value={exercise.rest}
                    onChange={(e) =>
                      updateExercise(exercise.id, "rest", e.target.value)
                    }
                  />
                </div>
                
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExercise(exercise.id)}
                    disabled={exercises.length === 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                    <span className="sr-only">Remover</span>
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
            Salvar Treino
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutFormDialog;
