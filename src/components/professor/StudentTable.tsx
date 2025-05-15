
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Dumbbell, Utensils } from "lucide-react";
import AttendanceDialog from "@/components/professor/AttendanceDialog";
import WorkoutFormDialog from "@/components/professor/WorkoutFormDialog";
import DietFormDialog from "@/components/professor/DietFormDialog";

// Mock student data
const mockStudents = [
  { id: 1, name: "Ana Silva", joinDate: "15/03/2023", status: "Ativo" },
  { id: 2, name: "Bruno Santos", joinDate: "22/04/2023", status: "Ativo" },
  { id: 3, name: "Carla Oliveira", joinDate: "10/01/2023", status: "Inativo" },
  { id: 4, name: "Daniel Martins", joinDate: "05/05/2023", status: "Ativo" },
  { id: 5, name: "Eduarda Costa", joinDate: "18/02/2023", status: "Ativo" },
];

const StudentTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showDietForm, setShowDietForm] = useState(false);
  
  // Filter students based on search term
  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAttendanceView = (student: any) => {
    setSelectedStudent(student);
    setShowAttendance(true);
  };
  
  const handleWorkoutForm = (student: any) => {
    setSelectedStudent(student);
    setShowWorkoutForm(true);
  };
  
  const handleDietForm = (student: any) => {
    setSelectedStudent(student);
    setShowDietForm(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Alunos Cadastrados</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar aluno..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {student.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleAttendanceView(student)}
                      >
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Frequência</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleWorkoutForm(student)}
                      >
                        <Dumbbell className="h-4 w-4" />
                        <span className="sr-only">Treino</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDietForm(student)}
                      >
                        <Utensils className="h-4 w-4" />
                        <span className="sr-only">Dieta</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  Nenhum aluno encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialogs */}
      {selectedStudent && (
        <>
          <AttendanceDialog
            student={selectedStudent}
            open={showAttendance}
            onOpenChange={setShowAttendance}
          />
          
          <WorkoutFormDialog
            student={selectedStudent}
            open={showWorkoutForm}
            onOpenChange={setShowWorkoutForm}
          />
          
          <DietFormDialog
            student={selectedStudent}
            open={showDietForm}
            onOpenChange={setShowDietForm}
          />
        </>
      )}
    </div>
  );
};

export default StudentTable;
