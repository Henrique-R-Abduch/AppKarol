import React from "react";
import BottomNav from "@/components/navigation/BottomNav";
import NutritionSummary from "@/components/dashboard/NutritionSummary";
import WorkoutFrequencyChart from "@/components/dashboard/WorkoutFrequencyChart";
import ProfileHeader from "@/components/dashboard/ProfileHeader";
import WorkoutOfTheDay from "@/components/dashboard/WorkoutOfTheDay";

// Helper function to generate motivational message based on workout data
const getMotivationalMessage = (data: Array<{ day: string; frequency: number }>) => {
  const completedDays = data.filter(day => day.frequency > 0).length;
  const totalDays = data.length;
  
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  if (completedDays === 0) return "Vamos começar a semana com tudo!";
  if (completedDays === totalDays) return "Parabéns! Você completou todos os treinos da semana!";
  
  if (today === 5) return "Sexta também é dia! Não desista agora.";
  if (today === 3 && completedDays >= 3) return "Metade da semana concluída! Continue assim!";
  if (completedDays >= 4) return "Estamos quase completando a semana de treino, não desista agora!";
  
  return "Mantenha a consistência, cada treino conta!";
};

// Helper function to calculate consecutive workout days
const getConsecutiveDays = (data: Array<{ day: string; frequency: number }>) => {
  // For demonstration purposes, we're returning 5
  // In a real app, this would calculate the actual streak based on historical data
  return 5;
};

const Dashboard: React.FC = () => {
  // Sample nutrition data
  const nutritionData = {
    calories: {
      consumed: 1450,
      goal: 2200,
    },
    macros: {
      protein: { consumed: 85, goal: 140 },
      carbs: { consumed: 135, goal: 250 },
      fat: { consumed: 45, goal: 70 }
    }
  };

  // Sample workout frequency data
  const workoutFrequencyData = [
    { day: "Seg", frequency: 1 },
    { day: "Ter", frequency: 1 },
    { day: "Qua", frequency: 0 },
    { day: "Qui", frequency: 1 },
    { day: "Sex", frequency: 0 },
    { day: "Sáb", frequency: 0 },
    { day: "Dom", frequency: 0 }
  ];

  // Get the motivational message for the user
  const motivationalMessage = getMotivationalMessage(workoutFrequencyData);
  
  // Get consecutive days
  const consecutiveDays = getConsecutiveDays(workoutFrequencyData);

  return (
    <div className="pb-20 dark:bg-background min-h-screen relative">
      {/* Header Profile Section with motivational message */}
      <ProfileHeader 
        name="Nathan"
        imageUrl="https://randomuser.me/api/portraits/men/32.jpg"
        motivationalMessage={motivationalMessage}
        consecutiveDays={consecutiveDays}
      />

      <div className="px-5 py-3 grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="w-full flex flex-col gap-4">
    <NutritionSummary data={nutritionData} />
    <WorkoutOfTheDay />
  </div>

  <div className="flex flex-col gap-4">
    <WorkoutFrequencyChart data={workoutFrequencyData} />
  </div>
</div>



      <BottomNav />
    </div>
  );
};

export default Dashboard;
