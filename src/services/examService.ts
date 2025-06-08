
import api from '@/config/api';

export interface Exam {
  id: number;
  module_name: string;
  module_code: string;
  date: string;
  start_time: string;
  end_time: string;
  salle_name: string;
  teacher_name: string;
  students_count: number;
  type: string;
  status: string;
}

export const examService = {
  getAll: async (): Promise<Exam[]> => {
    const response = await api.get('/exams');
    return response.data;
  },

  create: async (examData: any) => {
    const response = await api.post('/exams', examData);
    return response.data;
  },

  update: async (id: number, examData: any) => {
    const response = await api.put(`/exams/${id}`, examData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/exams/${id}`);
    return response.data;
  }
};
