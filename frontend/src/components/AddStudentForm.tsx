import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useCourses } from '../hooks/useCourses';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const AddStudentForm: React.FC = () => {
  const { addStudentMutation } = useStudents();
  const { coursesQuery } = useCourses();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudentMutation.mutate({
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      course_id: formData.course_id ? parseInt(formData.course_id) : null,
    }, {
      onSuccess: () => {
        toast.success('Student added successfully!');
        setFormData({ name: '', email: '', age: '', course_id: '' });
      },
      onError: (err: any) => {
        toast.error(`Error: ${err.message}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
        <Input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-muted-foreground">Age</label>
        <Input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-muted-foreground">Course</label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={formData.course_id || ''}
          onChange={(e) => setFormData({ ...formData, course_id: e.target.value ? e.target.value : '' })}
        >
          <option value="">Select Course</option>
          {coursesQuery.data?.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full" disabled={addStudentMutation.isPending}>
        {addStudentMutation.isPending ? 'Enrolling...' : 'Submit Enrollment'}
      </Button>
    </form>
  );
};
