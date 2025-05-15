
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Settings,
  Search
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import StudentTable from "@/components/professor/StudentTable";
import ProfessorHeader from "@/components/professor/ProfessorHeader";

const ProfessorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("students");
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-primary/30 to-purple-dark/30 dark:from-purple-primary/10 dark:to-background">
      <ProfessorHeader />
      
      {/* Side Navigation */}
      <div className="flex flex-1">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex w-64 p-4 flex-col gap-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-primary/20 to-purple-accent/20 rounded-2xl blur-xl"></div>
            <Card className="relative bg-card/80 backdrop-blur-sm border-purple-accent/20 overflow-hidden">
              <CardContent className="p-0">
                <AspectRatio ratio={16/5}>
                  <div className="h-full w-full p-4 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-purple-primary">Karol Personal</p>
                      <p className="text-sm text-muted-foreground">Área do Professor</p>
                    </div>
                  </div>
                </AspectRatio>
              </CardContent>
            </Card>
          </div>
          
          <NavigationMenu orientation="vertical" className="w-full max-w-none flex flex-col items-start">
            <NavigationMenuList className="flex flex-col w-full space-y-2">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full justify-start gap-2 bg-transparent",
                    activeTab === "students" && "bg-purple-primary/20 text-purple-primary"
                  )}
                  onClick={() => setActiveTab("students")}
                >
                  <Users size={18} />
                  <span>Alunos</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full justify-start gap-2 bg-transparent",
                    activeTab === "workouts" && "bg-purple-primary/20 text-purple-primary"
                  )}
                  onClick={() => setActiveTab("workouts")}
                >
                  <LayoutDashboard size={18} />
                  <span>Treinos</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full justify-start gap-2 bg-transparent",
                    activeTab === "diets" && "bg-purple-primary/20 text-purple-primary"
                  )}
                  onClick={() => setActiveTab("diets")}
                >
                  <CalendarDays size={18} />
                  <span>Dietas</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full justify-start gap-2 bg-transparent"
                  )}
                >
                  <Settings size={18} />
                  <span>Configurações</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6"
        >
          <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {/* Mobile Tabs */}
            <div className="md:hidden">
              <Tabs defaultValue="students" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full bg-purple-primary/20 rounded-none">
                  <TabsTrigger value="students" className="flex-1 data-[state=active]:bg-purple-primary/30">Alunos</TabsTrigger>
                  <TabsTrigger value="workouts" className="flex-1 data-[state=active]:bg-purple-primary/30">Treinos</TabsTrigger>
                  <TabsTrigger value="diets" className="flex-1 data-[state=active]:bg-purple-primary/30">Dietas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="students" className="p-4">
                  <StudentTable />
                </TabsContent>
                
                <TabsContent value="workouts" className="p-4">
                  <div className="text-center py-10 glass-morphism p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-gradient">Gerenciamento de Treinos</h3>
                    <p className="text-muted-foreground mt-2">
                      Selecione um aluno na aba Alunos para cadastrar ou editar treinos
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="diets" className="p-4">
                  <div className="text-center py-10 glass-morphism p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-gradient">Gerenciamento de Dietas</h3>
                    <p className="text-muted-foreground mt-2">
                      Selecione um aluno na aba Alunos para cadastrar ou editar dietas
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Desktop Content Based on Navigation */}
            <div className="hidden md:block p-6">
              {activeTab === "students" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-primary to-purple-light bg-clip-text text-transparent">Alunos Cadastrados</h2>
                    <div className="relative bg-white/10 dark:bg-black/20 rounded-lg flex items-center px-3 border border-white/20 dark:border-white/10">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <input
                        placeholder="Buscar aluno..."
                        className="bg-transparent border-0 focus:outline-none focus:ring-0 pl-2 py-2 text-sm placeholder:text-muted-foreground/70"
                      />
                    </div>
                  </div>
                  <StudentTable />
                </div>
              )}
              
              {activeTab === "workouts" && (
                <div className="text-center py-10 glass-morphism p-6 rounded-xl">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-primary to-purple-light bg-clip-text text-transparent">Gerenciamento de Treinos</h3>
                  <p className="text-muted-foreground mt-2">
                    Selecione um aluno na aba Alunos para cadastrar ou editar treinos
                  </p>
                </div>
              )}
              
              {activeTab === "diets" && (
                <div className="text-center py-10 glass-morphism p-6 rounded-xl">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-primary to-purple-light bg-clip-text text-transparent">Gerenciamento de Dietas</h3>
                  <p className="text-muted-foreground mt-2">
                    Selecione um aluno na aba Alunos para cadastrar ou editar dietas
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom Navigation for Mobile */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-white/20 dark:border-white/10 flex justify-around py-2 z-50">
            <button
              onClick={() => setActiveTab("students")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                activeTab === "students" ? "text-purple-primary" : "text-muted-foreground"
              }`}
            >
              <Users size={20} />
              <span className="text-xs">Alunos</span>
            </button>
            <button
              onClick={() => setActiveTab("workouts")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                activeTab === "workouts" ? "text-purple-primary" : "text-muted-foreground"
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="text-xs">Treinos</span>
            </button>
            <button
              onClick={() => setActiveTab("diets")}
              className={`flex flex-col items-center p-2 rounded-lg ${
                activeTab === "diets" ? "text-purple-primary" : "text-muted-foreground"
              }`}
            >
              <CalendarDays size={20} />
              <span className="text-xs">Dietas</span>
            </button>
            <button
              className="flex flex-col items-center p-2 rounded-lg text-muted-foreground"
            >
              <Settings size={20} />
              <span className="text-xs">Config</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
