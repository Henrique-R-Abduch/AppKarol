
import React from "react";
import ThemeToggle from "@/components/navigation/ThemeToggle";
import { Flame } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  imageUrl: string;
  motivationalMessage?: string;
  consecutiveDays?: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  name, 
  imageUrl, 
  motivationalMessage,
  consecutiveDays = 5 // Default value for demonstration
}) => {
  // Helper function for the greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  return (
    <div className="bg-card px-5 pt-12 pb-5 rounded-b-3xl shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-muted-foreground text-sm">{getGreeting()}</p>
            <h1 className="text-xl font-bold">{name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative">
            <div className="h-9 w-9 bg-card rounded-full flex items-center justify-center shadow-md">
              <span className="text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            <span className="absolute top-0 right-0 h-3 w-3 bg-blue-600 rounded-full border border-card"></span>
          </div>
        </div>
      </div>
      
      {/* Streak Counter + Motivational Message */}
      <div className="mt-4">
        {motivationalMessage && (
          <div className="bg-[#1A1F2C] rounded-lg p-3 flex items-center gap-3 shadow-sm animate-fade-in">
            <div className="bg-gradient-to-br from-fitness-orange to-fitness-darkOrange h-8 w-8 rounded-full flex items-center justify-center">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-white">A hora do pesadelo é agora e sorriso depois</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
