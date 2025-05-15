
import React from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

const WorkoutOfTheDay: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="rounded-2xl overflow-hidden shadow-md relative min-h-[120px]">

      <div className="absolute inset-0 bg-gradient-to-br from-fitness-orange to-fitness-darkOrange"></div>
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-white font-semibold text-sm">TREINO DO DIA</h3>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-white text-xl font-bold">Membros Superiores</h2>
          </div>
          <button 
            className="bg-white text-fitness-darkOrange px-5 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
            onClick={() => navigate('/workout')}
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutOfTheDay;
