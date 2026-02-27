import api from './api';
import type { Barbershop, CreateBarbershopRequest, UpdateBarbershopRequest, PaginatedResponse } from '../types';

export const barbershopService = {
  /**
   * Listar todas as barbearias
   */
  list: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Barbershop>> => {
    const response = await api.get('/barbershops', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Buscar barbearia por ID
   */
  getById: async (barbershopId: string): Promise<Barbershop> => {
    const response = await api.get(`/barbershops/${barbershopId}`);
    return response.data;
  },

  /**
   * Buscar barbearias de um proprietário
   */
  getByOwner: async (ownerId: string): Promise<Barbershop[]> => {
    const response = await api.get(`/barbershops/owner/${ownerId}`);
    return response.data;
  },

  /**
   * Criar nova barbearia
   */
  create: async (data: CreateBarbershopRequest): Promise<Barbershop> => {
    const response = await api.post('/barbershops', data);
    return response.data;
  },

  /**
   * Atualizar barbearia
   */
  update: async (barbershopId: string, data: UpdateBarbershopRequest): Promise<Barbershop> => {
    const response = await api.patch(`/barbershops/${barbershopId}`, data);
    return response.data;
  },

  /**
   * Deletar barbearia
   */
  delete: async (barbershopId: string): Promise<void> => {
    await api.delete(`/barbershops/${barbershopId}`);
  },
};
