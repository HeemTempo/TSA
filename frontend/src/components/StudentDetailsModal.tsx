import React from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import type { Student } from '../lib/api';

interface StudentDetailsModalProps {
  student: Student;
  onClose: () => void;
}

export const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background border rounded-lg w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-xl font-bold">Student Profile</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">ID</label>
                <p className="text-lg font-mono">#{student.id.toString().padStart(4, '0')}</p>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Name</label>
                <p className="text-lg">{student.name}</p>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
                <p className="text-lg">{student.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Age</label>
                <p className="text-lg">{student.age}</p>
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Course</label>
                <p className="text-lg">
                  {student.course_name || 'Unassigned'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t flex justify-end">
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
