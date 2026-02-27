import api from './api';
import type { User, CreateUserRequest, UpdateUserRequest, PaginatedResponse } from '../types';

export const userService = {
  /**
   * Listar todos os usuários (paginado)
   */
  list: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> => {
    const response = await api.get('/users', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Buscar usuário por ID
   */
  getById: async (userId: string): Promise<User> => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Listar usuários por role
   */
  getByRole: async (role: string): Promise<User[]> => {
    const response = await api.get(`/users/role/${role}`);
    return response.data;
  },

  /**
   * Listar usuários de uma barbearia
   */
  getByBarbershop: async (barbershopId: string): Promise<User[]> => {
    const response = await api.get(`/users/barbershop/${barbershopId}`);
    return response.data;
  },

  /**
   * Criar novo usuário
   */
  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await api.post('/users', data);
    return response.data;
  },

  /**
   * Atualizar usuário
   */
  update: async (userId: string, data: UpdateUserRequest): Promise<User> => {
    const response = await api.patch(`/users/${userId}`, data);
    return response.data;
  },

  /**
   * Deletar usuário
   */
  delete: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}`);
  },
};
