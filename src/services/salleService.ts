
import api from '@/config/api';

export interface Salle {
  id: number;
  name: string;
  capacity: number;
  type: string;
  equipment: string;
  status: string;
  created_at: string;
}

export const salleService = {
  getAll: async (): Promise<Salle[]> => {
    const response = await api.get('/salles');
    return response.data;
  },

  create: async (salleData: any) => {
    const response = await api.post('/salles', salleData);
    return response.data;
  },

  update: async (id: number, salleData: any) => {
    const response = await api.put(`/salles/${id}`, salleData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/salles/${id}`);
    return response.data;
  }
};
