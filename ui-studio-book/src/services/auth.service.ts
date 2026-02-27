import api from './api';
import type { AuthResponse, LoginRequest, RegisterRequest } from '../types';

export const authService = {
  /**
   * Registrar novo usuário
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Login com email e senha
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  /**
   * Salvar token no localStorage
   */
  saveToken: (token: string): void => {
    localStorage.setItem('accessToken', token);
  },

  /**
   * Obter token do localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  /**
   * Limpar dados de autenticação
   */
  logout: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  /**
   * Verificar se usuário está autenticado
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};
