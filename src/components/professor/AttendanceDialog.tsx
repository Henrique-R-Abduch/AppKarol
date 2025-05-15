
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";

// Mock attendance data
const mockAttendanceData = {
  present: [
    new Date(2023, 4, 1),
    new Date(2023, 4, 3),
    new Date(2023, 4, 5),
    new Date(2023, 4, 8),
    new Date(2023, 4, 10),
    new Date(2023, 4, 15),
    new Date(2023, 4, 17),
    new Date(2023, 4, 19),
    new Date(2023, 4, 22),
    new Date(2023, 4, 24),
  ],
  absent: [
    new Date(2023, 4, 12),
    new Date(2023, 4, 26),
    new Date(2023, 4, 29),
  ],
};

interface AttendanceDialogProps {
  student: {
    id: number;
    name: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AttendanceDialog: React.FC<AttendanceDialogProps> = ({
  student,
  open,
  onOpenChange,
}) => {
  // Helper function to check if date is in attendance
  const isPresentDate = (date: Date) => {
    return mockAttendanceData.present.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const isAbsentDate = (date: Date) => {
    return mockAttendanceData.absent.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Histórico de Frequência - {student.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-center items-center mb-6 gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Presente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Ausente</span>
            </div>
          </div>
          
          <Calendar
            mode="multiple"
            selected={[...mockAttendanceData.present, ...mockAttendanceData.absent]}
            disabled
            modifiers={{
              present: mockAttendanceData.present,
              absent: mockAttendanceData.absent,
            }}
            modifiersStyles={{
              present: { backgroundColor: 'rgba(74, 222, 128, 0.2)' },
              absent: { backgroundColor: 'rgba(248, 113, 113, 0.2)' },
            }}
            className="rounded-md border"
          />
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Frequência: {mockAttendanceData.present.length} dias</p>
            <p>Faltas: {mockAttendanceData.absent.length} dias</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialog;
