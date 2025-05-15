
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

const ProfessorHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-primary to-purple-dark py-4 px-6 sticky top-0 z-10 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <img 
              src="/lovable-uploads/2c1e5507-507b-47c8-a3ae-35e5337dde8a.png" 
              alt="Karol Personal" 
              className="h-8 w-auto"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Painel do Professor</h1>
            <p className="text-white/80 text-sm">Gerenciamento de alunos</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/80 hover:text-white hover:bg-white/20"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:flex items-center bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
            <Search className="h-4 w-4 text-white/70" />
            <input 
              placeholder="Pesquisar..." 
              className="bg-transparent border-0 text-white focus:outline-none focus:ring-0 placeholder:text-white/50 text-sm w-28 lg:w-40"
            />
          </div>
          
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default ProfessorHeader;
