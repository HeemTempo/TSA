import React, { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Trash2, Edit, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';

export const CourseManagement: React.FC = () => {
  const { coursesQuery, addCourseMutation, updateCourseMutation, deleteCourseMutation } = useCourses();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addCourseMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('Course created successfully');
        setFormData({ name: '', code: '', description: '' });
        setIsAdding(false);
      },
      onError: (err: any) => {
        toast.error(`Failed to create course: ${err.message}`);
      }
    });
  };

  const handleUpdate = (id: number) => {
    updateCourseMutation.mutate({ id, data: formData }, {
      onSuccess: () => {
        toast.success('Course updated successfully');
        setEditingId(null);
        setFormData({ name: '', code: '', description: '' });
      },
      onError: (err: any) => {
        toast.error(`Failed to update course: ${err.message}`);
      }
    });
  };

  const startEdit = (course: any) => {
    setEditingId(course.id);
    setFormData({ name: course.name, code: course.code, description: course.description || '' });
  };

  if (coursesQuery.isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[...Array(6)].map((_, i) => (
             <Skeleton key={i} className="h-32 w-full rounded-2xl" />
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Courses</h2>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} variant="default">
            New Course
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="bg-muted/30 border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Add Course</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Course Name</label>
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Code</label>
              <Input
                placeholder="Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={addCourseMutation.isPending}>
              {addCourseMutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </div>
      )}

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-32">Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead className="text-right w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coursesQuery.data?.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  {editingId === course.id ? (
                    <Input
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="h-8"
                    />
                  ) : (
                    <span className="font-mono text-sm">{course.code}</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === course.id ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-8"
                    />
                  ) : (
                    course.name
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingId === course.id ? (
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleUpdate(course.id)} className="text-green-600">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="text-destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => startEdit(course)} className="text-amber-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => {
                          if (confirm('Delete this course?')) {
                            deleteCourseMutation.mutate(course.id, {
                              onSuccess: () => toast.success('Course deleted'),
                              onError: (err: any) => toast.error(err.message)
                            });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {coursesQuery.data?.length === 0 && !isAdding && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground text-sm">
                  No records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
