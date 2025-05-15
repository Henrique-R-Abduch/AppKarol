
import React, { useState } from "react";
import { Search, Calendar, Dumbbell, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BottomNav from "@/components/navigation/BottomNav";

const Workout: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  
  const workoutGroups = [
    {
      day: "Segunda",
      title: "Treino A - Superiores",
      completed: false,
      progress: 0,
      exercises: [
        { name: "Supino reto", sets: "4 séries", reps: "12 reps", completed: false },
        { name: "Remada curvada", sets: "4 séries", reps: "10-12 reps", completed: false },
        { name: "Desenvolvimento", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Rosca direta", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Tríceps corda", sets: "3 séries", reps: "12 reps", completed: false },
      ]
    },
    {
      day: "Quarta",
      title: "Treino B - Inferiores",
      completed: false,
      progress: 0,
      exercises: [
        { name: "Agachamento livre", sets: "4 séries", reps: "12 reps", completed: false },
        { name: "Leg Press 45°", sets: "4 séries", reps: "12 reps", completed: false },
        { name: "Cadeira extensora", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Cadeira flexora", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Panturrilha em pé", sets: "4 séries", reps: "15 reps", completed: false },
      ]
    },
    {
      day: "Sexta",
      title: "Treino C - Completo",
      completed: false,
      progress: 0,
      exercises: [
        { name: "Supino inclinado", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Puxada frontal", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Agachamento sumô", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Rosca martelo", sets: "3 séries", reps: "12 reps", completed: false },
        { name: "Tríceps francês", sets: "3 séries", reps: "12 reps", completed: false },
      ]
    }
  ];

  const todayWorkout = workoutGroups[0]; // Assumindo que o primeiro é o treino do dia

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header com visual aprimorado - usando o gradiente do home */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-fitness-orange to-fitness-darkOrange z-0"></div>
        <div className="relative z-10 px-5 pt-8 pb-6">
          <h1 className="text-2xl font-bold mb-2 text-white">Meus Treinos</h1>
          <p className="text-white/80 text-sm mb-6">Mantenha a consistência, cada treino conta!</p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex items-center">
            <Search className="ml-3 h-4 w-4 text-white/70" />
            <Input 
              placeholder="Buscar treino" 
              className="border-none bg-transparent text-white placeholder:text-white/60 pl-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal com padding para não sobrepor o header */}
      <div className="px-5 mt-4">
        <Tabs defaultValue="weekly" className="w-full">
          {/* Tabs redesenhados - removido "exercícios" */}
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white rounded-full p-1 shadow-md">
            <TabsTrigger value="weekly" className="rounded-full data-[state=active]:bg-fitness-orange data-[state=active]:text-white">
              Semanal
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-full data-[state=active]:bg-fitness-orange data-[state=active]:text-white">
              Histórico
            </TabsTrigger>
          </TabsList>
          
          {/* Conteúdo da Tab Semanal */}
          <TabsContent value="weekly" className="space-y-6">
            {/* Treino do Dia - Card em destaque centralizado e redimensionado */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-md">
                <h2 className="text-lg font-semibold mb-3 flex items-center">
                  Treino de Hoje
                </h2>
                
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="relative">
                    <AspectRatio ratio={16/6} className="bg-gradient-to-r from-fitness-orange to-fitness-darkOrange">
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                            {todayWorkout.day}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white text-xl font-bold">{todayWorkout.title}</h3>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center text-white/90 text-xs">
                              <Dumbbell className="h-3 w-3 mr-1" /> 
                              {todayWorkout.exercises.length} exercícios
                            </div>
                            <Button size="sm" className="bg-white text-fitness-darkOrange hover:bg-white/90 rounded-full px-4 h-8">
                              Iniciar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Lista de Treinos da Semana */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                Treinos da Semana
              </h2>
              
              {workoutGroups.map((group, groupIndex) => (
                <Card key={groupIndex} className="overflow-hidden p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="bg-fitness-orange/10 text-fitness-orange p-2 rounded-lg mr-3">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-muted-foreground">{group.day}</p>
                          <h3 className="font-bold">{group.title}</h3>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-3 ml-12">
                        {group.exercises.slice(0, 3).map((exercise, exerciseIndex) => (
                          <div key={exerciseIndex} className="text-sm flex items-center text-muted-foreground">
                            <div className="h-1.5 w-1.5 bg-fitness-orange/60 rounded-full mr-2"></div>
                            {exercise.name}
                          </div>
                        ))}
                        
                        {group.exercises.length > 3 && (
                          <div className="text-sm text-fitness-orange flex items-center">
                            <div className="h-1.5 w-1.5 bg-fitness-orange/60 rounded-full mr-2"></div>
                            {group.exercises.length - 3} mais exercícios
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground hover:text-fitness-orange hover:bg-fitness-orange/10">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Histórico Tab */}
          <TabsContent value="history">
            <div className="text-center py-10 px-4 bg-gray-50 rounded-xl">
              <Calendar className="h-12 w-12 mx-auto text-fitness-orange opacity-70 mb-3" />
              <h3 className="text-lg font-medium mb-1">Histórico de treinos</h3>
              <p className="text-muted-foreground text-sm">Aqui você poderá ver todos os seus treinos realizados e sua evolução ao longo do tempo.</p>
              <Button className="mt-6 bg-fitness-orange hover:bg-fitness-darkOrange">
                Registrar treino
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
};

export default Workout;
