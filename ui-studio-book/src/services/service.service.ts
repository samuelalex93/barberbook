import api from './api';
import type { Service, CreateServiceRequest, UpdateServiceRequest, PaginatedResponse } from '../types';

export const serviceService = {
  /**
   * Listar todos os serviços
   */
  list: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Service>> => {
    const response = await api.get('/services', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Buscar serviço por ID
   */
  getById: async (serviceId: string): Promise<Service> => {
    const response = await api.get(`/services/${serviceId}`);
    return response.data;
  },

  /**
   * Listar serviços de uma barbearia
   */
  getByBarbershop: async (barbershopId: string): Promise<Service[]> => {
    const response = await api.get(`/services/barbershop/${barbershopId}`);
    return response.data;
  },

  /**
   * Criar novo serviço
   */
  create: async (barbershopId: string, data: CreateServiceRequest): Promise<Service> => {
    const response = await api.post(`/services/barbershop/${barbershopId}`, data);
    return response.data;
  },

  /**
   * Atualizar serviço
   */
  update: async (serviceId: string, data: UpdateServiceRequest): Promise<Service> => {
    const response = await api.patch(`/services/${serviceId}`, data);
    return response.data;
  },

  /**
   * Deletar serviço
   */
  delete: async (serviceId: string): Promise<void> => {
    await api.delete(`/services/${serviceId}`);
  },
};
