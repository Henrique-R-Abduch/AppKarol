import React from "react";
import AuthForm from "@/components/AuthForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-primary to-black relative">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Button variant="ghost" className="text-white p-2 rounded-full">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6"
      >
        <div className="mb-8 text-center">
          <img 
            src="/lovable-uploads/raw.png" 
            alt="Karol Personal" 
            className="h-34 w-auto mx-auto mb-4 object-contain"
          />
        </div>
        
        <AuthForm showRegister={false} customClass="purple-theme" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center text-white/70 text-xs"
        >
          Direitos autorais Karoline Personal © {new Date().getFullYear()}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
