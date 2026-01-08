import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  course_id: number | null;
  course_name?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}

// Students API
export const getStudents = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  course_id?: number;
}): Promise<PaginatedResponse<Student>> => {
  const response = await api.get('/students', { params });
  return response.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

export const addStudent = async (student: Omit<Student, 'id'>): Promise<{ success: boolean; data: Student }> => {
  const response = await api.post('/students', student);
  return response.data;
};

export const updateStudent = async (id: number, student: Partial<Student>): Promise<{ success: boolean }> => {
  const response = await api.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await api.delete(`/students/${id}`);
};

// Courses API
export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses');
  return response.data;
};

export const addCourse = async (course: Omit<Course, 'id'>): Promise<Course> => {
  const response = await api.post('/courses', course);
  return response.data;
};

export const updateCourse = async (id: number, course: Partial<Course>): Promise<Course> => {
  const response = await api.put(`/courses/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/courses/${id}`);
};

export default api;
