import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useCourses } from '../hooks/useCourses';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import type { Student } from '../lib/api';

interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, onClose }) => {
  const { updateStudentMutation } = useStudents();
  const { coursesQuery } = useCourses();
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    age: student.age.toString(),
    course_id: student.course_id?.toString() || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentMutation.mutate({
      id: student.id,
      data: {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        course_id: formData.course_id ? parseInt(formData.course_id) : null,
      }
    }, {
      onSuccess: () => {
        toast.success('Student updated successfully');
        onClose();
      },
      onError: (err: any) => {
        toast.error(`Update failed: ${err.message}`);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background border rounded-lg w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-xl font-bold">Edit Student</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-muted-foreground">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Age</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-muted-foreground">Course</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  value={formData.course_id}
                  onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                  required
                >
                  <option value="">Select Course</option>
                  {coursesQuery.data?.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={updateStudentMutation.isPending}>
                {updateStudentMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
