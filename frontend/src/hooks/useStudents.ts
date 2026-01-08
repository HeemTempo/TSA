import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudents, getStudentById, addStudent, updateStudent, deleteStudent } from '../lib/api';
import type { Student } from '../lib/api';

export const useStudents = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  course_id?: number;
}) => {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: ['students', params],
    queryFn: () => getStudents(params),
  });

  const addStudentMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Student> }) => updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  return {
    studentsQuery,
    addStudentMutation,
    updateStudentMutation,
    deleteStudentMutation,
  };
};

export const useStudent = (id: number | null) => {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => (id ? getStudentById(id) : null),
    enabled: !!id,
  });
};
