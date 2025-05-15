
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  Settings,
  Calendar, 
  ChevronRight,
  BarChart2,
  Heart,
  Lock,
  LogOut
} from "lucide-react";
import BottomNav from "@/components/navigation/BottomNav";

const Profile: React.FC = () => {
  const userInfo = {
    name: "João Silva",
    email: "joao@example.com",
    joined: "Maio 2025",
    stats: {
      weight: "78kg",
      height: "182cm",
      age: "32 anos",
      goal: "Ganho muscular"
    }
  };

  const menuItems = [
    { 
      icon: BarChart2, 
      label: "Estatísticas e progresso", 
      description: "Acompanhe sua evolução" 
    },
    { 
      icon: Settings, 
      label: "Configurações", 
      description: "Preferências do aplicativo" 
    },
    { 
      icon: Heart, 
      label: "Objetivos de saúde", 
      description: "Defina suas metas" 
    },
    { 
      icon: Lock, 
      label: "Privacidade", 
      description: "Configurações de privacidade" 
    }
  ];

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-8 pb-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      </div>

      {/* User Profile Card */}
      <div className="px-5 -mt-2">
        <Card className="fitness-card mb-6">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-fitness-purple rounded-full flex items-center justify-center text-white text-xl font-bold">
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="ml-4">
              <h2 className="font-medium text-lg">{userInfo.name}</h2>
              <p className="text-gray-500 text-sm">{userInfo.email}</p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Membro desde {userInfo.joined}</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Stats */}
        <Card className="fitness-card mb-6">
          <h3 className="font-medium mb-3">Informações físicas</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Peso</span>
              <p className="font-medium">{userInfo.stats.weight}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Altura</span>
              <p className="font-medium">{userInfo.stats.height}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Idade</span>
              <p className="font-medium">{userInfo.stats.age}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Objetivo</span>
              <p className="font-medium">{userInfo.stats.goal}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4 text-sm">
            Atualizar informações
          </Button>
        </Card>
        
        {/* Menu */}
        <Card className="fitness-card mb-6">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <item.icon className="h-4 w-4 text-fitness-darkGray" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </Card>
        
        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair da conta
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
