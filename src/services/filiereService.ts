
import api from '@/config/api';

export interface Filiere {
  id: number;
  name: string;
  code: string;
  description: string;
  created_at: string;
}

export const filiereService = {
  getAll: async (): Promise<Filiere[]> => {
    const response = await api.get('/filieres');
    return response.data;
  },

  create: async (filiereData: any) => {
    const response = await api.post('/filieres', filiereData);
    return response.data;
  },

  update: async (id: number, filiereData: any) => {
    const response = await api.put(`/filieres/${id}`, filiereData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/filieres/${id}`);
    return response.data;
  }
};
