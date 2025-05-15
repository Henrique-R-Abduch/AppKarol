
import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

interface ClassData {
  title: string;
  date: string;
  instructor: string;
  participants: number[];
}

interface UpcomingClassesProps {
  classes: ClassData[];
}

const UpcomingClasses: React.FC<UpcomingClassesProps> = ({ classes }) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Próximas aulas</h2>
        <button 
          className="text-primary text-sm font-medium"
          onClick={() => navigate('/workout')}
        >
          Ver mais
        </button>
      </div>

      <div className="space-y-3">
        {classes.map((classItem, index) => (
          <div key={index} className="p-4 bg-card rounded-xl shadow-sm">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <div className="bg-muted h-12 w-12 rounded-lg flex items-center justify-center">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{classItem.title}</h3>
                  <p className="text-xs text-muted-foreground">{classItem.date} • Prof. {classItem.instructor}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {classItem.participants.map((i) => (
                    <div key={i} className="h-6 w-6 rounded-full bg-muted border border-card overflow-hidden">
                      <img 
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                        alt="Participant" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingClasses;
