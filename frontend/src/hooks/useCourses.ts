import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../lib/api';
import type { Course } from '../lib/api';

export const useCourses = () => {
  const queryClient = useQueryClient();

  const coursesQuery = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const addCourseMutation = useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Course> }) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    coursesQuery,
    addCourseMutation,
    updateCourseMutation,
    deleteCourseMutation,
  };
};
