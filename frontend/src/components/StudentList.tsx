import React, { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import { useCourses } from '../hooks/useCourses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2, Search, ChevronLeft, ChevronRight, Eye, Edit } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Spinner } from './ui/spinner';
import { EditStudentModal } from './EditStudentModal';
import { StudentDetailsModal } from './StudentDetailsModal';
import { toast } from 'sonner';
import type { Student } from '../lib/api';

export const StudentList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [courseId, setCourseId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const limit = 10;

  const { studentsQuery, deleteStudentMutation } = useStudents({
    page,
    limit,
    search,
    course_id: courseId,
  });

  const { coursesQuery } = useCourses();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? parseInt(e.target.value) : undefined;
    setCourseId(val);
    setPage(1);
  };

  if (studentsQuery.isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (studentsQuery.isError) {
    return (
      <div className="p-8 text-center bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
        <p className="font-semibold">Error loading students</p>
        <p className="text-sm">Please check your connection and try again.</p>
      </div>
    );
  }

  const response = studentsQuery.data;
  const students = response?.data || [];
  const pagination = response?.pagination;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      deleteStudentMutation.mutate(id, {
        onSuccess: () => toast.success('Student removed from directory'),
        onError: (err: any) => toast.error(err.message)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/30 p-4 rounded-lg border">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 h-10"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
            value={courseId || ''}
            onChange={handleCourseChange}
          >
            <option value="">Filter by Course</option>
            {coursesQuery.data?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead className="hidden md:table-cell w-20">Age</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-right w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id} className="hover:bg-muted/30">
                <TableCell className="text-xs text-muted-foreground">
                  {((page - 1) * limit) + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{student.name}</span>
                    <span className="text-xs text-muted-foreground">{student.email}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">
                  {student.age}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary/50 text-secondary-foreground">
                     {student.course_name || 'Unassigned'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-blue-600"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsDetailsModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-amber-600"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(student.id)}
                      disabled={deleteStudentMutation.isPending}
                    >
                      {deleteStudentMutation.isPending ? <Spinner className="size-4" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground text-sm">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-4">
          <p className="text-xs text-muted-foreground">
            Total Records: <span className="font-medium text-foreground">{pagination.total}</span>
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1">
              {[...Array(pagination.totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                  className="h-8 w-8 p-0 text-xs shrink-0"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isDetailsModalOpen && selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {isEditModalOpen && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedStudent(null);
          }}
        />
      )}
    </div>
  );
};
