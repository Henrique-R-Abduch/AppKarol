import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Droplet, X, ArrowDown, ArrowUp, ChevronLeft } from "lucide-react";

interface WaterConsumptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface WaterHistoryEntry {
  date: string;
  amount: number;
}

const WaterConsumptionDialog: React.FC<WaterConsumptionDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [selectedAmount, setSelectedAmount] = useState<number>(200);
  const [goalAmount] = useState<number>(3000);
  const [addingWater, setAddingWater] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [waterHistory, setWaterHistory] = useState<WaterHistoryEntry[]>([]);

  // Load water amount and history from local storage
  useEffect(() => {
    const savedAmount = localStorage.getItem('waterConsumption');
    if (savedAmount) {
      setWaterAmount(parseInt(savedAmount));
    }
    
    const savedHistory = localStorage.getItem('waterHistory');
    if (savedHistory) {
      setWaterHistory(JSON.parse(savedHistory));
    } else {
      // Generate sample history data if none exists
      generateSampleHistory();
    }
  }, []);

  // Generate sample history data for the past 10 days
  const generateSampleHistory = () => {
    const history: WaterHistoryEntry[] = [];
    const today = new Date();
    
    for (let i = 9; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const formattedDate = date.toLocaleDateString('pt-BR');
      
      // Generate a random amount between 1500 and 3500ml
      const randomAmount = Math.floor(Math.random() * 2000) + 1500;
      
      history.push({
        date: formattedDate,
        amount: randomAmount
      });
    }
    
    setWaterHistory(history);
    localStorage.setItem('waterHistory', JSON.stringify(history));
  };

  // Save to local storage whenever water amount changes
  useEffect(() => {
    localStorage.setItem('waterConsumption', waterAmount.toString());
    
    // Add today's consumption to history
    if (waterAmount > 0) {
      const today = new Date().toLocaleDateString('pt-BR');
      const updatedHistory = [...waterHistory];
      
      const todayEntry = updatedHistory.find(entry => entry.date === today);
      if (todayEntry) {
        todayEntry.amount = waterAmount;
      } else {
        updatedHistory.push({ date: today, amount: waterAmount });
        // Keep only the last 10 days
        if (updatedHistory.length > 10) {
          updatedHistory.shift();
        }
      }
      
      setWaterHistory(updatedHistory);
      localStorage.setItem('waterHistory', JSON.stringify(updatedHistory));
    }
  }, [waterAmount]);

  // Quick add buttons
  const quickAmounts = [180, 400, 500];

  // Calculate percentage
  const percentage = Math.min(Math.floor((waterAmount / goalAmount) * 100), 100);
  
  // Add water function
  const addWater = (amount: number) => {
    setAddingWater(true);
    setTimeout(() => {
      setWaterAmount(prev => prev + amount);
      setAddingWater(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none h-screen w-full p-0 m-0 overflow-hidden border-none">
        <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-blue-500 to-blue-700">
          {/* Top Bar with close button */}
          <div className="flex justify-between items-center p-4 bg-blue-600">
            <div className="flex items-center">
              {showHistory && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowHistory(false)}
                  className="mr-2 text-white hover:bg-blue-700"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}
              <h1 className="text-xl font-bold text-white">
                {showHistory ? "Histórico de Consumo" : "Registro de Água"}
              </h1>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="text-white hover:bg-blue-700"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {showHistory ? (
            // History View
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {waterHistory.map((entry, index) => {
                  const percentage = Math.min(Math.floor((entry.amount / goalAmount) * 100), 100);
                  return (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{entry.date}</span>
                        <span className="text-lg font-bold">{entry.amount} ml</span>
                      </div>
                      <div className="w-full h-3 bg-white/20 rounded-full">
                        <div 
                          className="h-full bg-white rounded-full transition-all" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right mt-1 text-sm">{percentage}% da meta</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Main Water Tracking View
            <div className="flex-1 flex flex-col">
              {/* Water Wave Animation */}
              <div className="relative flex-1 overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-400 transition-all duration-1000 ease-in-out"
                  style={{ 
                    height: `${percentage}%`, 
                    opacity: 0.8,
                    transform: addingWater ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  {/* Wave Effect */}
                  <div className="absolute -top-4 left-0 right-0 h-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 text-blue-400" style={{marginBottom: '-1px'}}>
                      <path fill="currentColor" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,96C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
                  {/* Water Amount Display */}
                  <div className="text-8xl font-bold mb-4 transition-all duration-300" style={{ transform: addingWater ? 'scale(1.1)' : 'scale(1)' }}>
                    {waterAmount} <span className="text-4xl">ml</span>
                  </div>
                  
                  <div className="text-xl mb-8">{percentage}% de {goalAmount}ml</div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-t-3xl">
                {/* Selected Amount Adjuster */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setSelectedAmount(prev => Math.max(prev - 50, 50))}
                    className="rounded-full h-12 w-12 border-white text-white bg-white/20 hover:bg-white/30"
                  >
                    <ArrowDown className="h-6 w-6" />
                  </Button>
                  
                  <div className="text-4xl font-medium w-32 text-center text-white">
                    {selectedAmount} ml
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setSelectedAmount(prev => Math.min(prev + 50, 1000))}
                    className="rounded-full h-12 w-12 border-white text-white bg-white/20 hover:bg-white/30"
                  >
                    <ArrowUp className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* Quick Add Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                  {quickAmounts.map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      className={`px-6 py-2 rounded-full text-lg ${
                        selectedAmount === amount 
                          ? 'bg-white text-blue-600' 
                          : 'bg-white/20 text-white border-white hover:bg-white/30'
                      }`}
                      onClick={() => setSelectedAmount(amount)}
                    >
                      {amount}ml
                    </Button>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-white/90 rounded-full py-8 text-xl font-medium"
                    onClick={() => addWater(selectedAmount)}
                  >
                    <Droplet className="mr-2 h-6 w-6" />
                    REGISTRAR ÁGUA
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 rounded-full py-4"
                    onClick={() => setShowHistory(true)}
                  >
                    VER HISTÓRICO
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WaterConsumptionDialog;
