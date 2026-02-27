import api from './api';
import type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest, PaginatedResponse } from '../types';

export const appointmentService = {
  /**
   * Listar todos os agendamentos
   */
  list: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Appointment>> => {
    const response = await api.get('/appointments', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Buscar agendamento por ID
   */
  getById: async (appointmentId: string): Promise<Appointment> => {
    const response = await api.get(`/appointments/${appointmentId}`);
    return response.data;
  },

  /**
   * Listar agendamentos de um barbeiro
   */
  getByBarber: async (barberId: string): Promise<Appointment[]> => {
    const response = await api.get(`/appointments/barber/${barberId}`);
    return response.data;
  },

  /**
   * Listar agendamentos de um cliente
   */
  getByClient: async (clientId: string): Promise<Appointment[]> => {
    const response = await api.get(`/appointments/client/${clientId}`);
    return response.data;
  },

  /**
   * Listar agendamentos de uma barbearia
   */
  getByBarbershop: async (barbershopId: string): Promise<Appointment[]> => {
    const response = await api.get(`/appointments/barbershop/${barbershopId}`);
    return response.data;
  },

  /**
   * Agendar um horário
   */
  create: async (
    barberId: string,
    barbershopId: string,
    data: CreateAppointmentRequest
  ): Promise<Appointment> => {
    const response = await api.post(
      `/appointments/barber/${barberId}/barbershop/${barbershopId}`,
      data
    );
    return response.data;
  },

  /**
   * Atualizar agendamento
   */
  update: async (appointmentId: string, data: UpdateAppointmentRequest): Promise<Appointment> => {
    const response = await api.patch(`/appointments/${appointmentId}`, data);
    return response.data;
  },

  /**
   * Cancelar agendamento
   */
  cancel: async (appointmentId: string): Promise<Appointment> => {
    const response = await api.patch(`/appointments/${appointmentId}/cancel`);
    return response.data;
  },

  /**
   * Deletar agendamento
   */
  delete: async (appointmentId: string): Promise<void> => {
    await api.delete(`/appointments/${appointmentId}`);
  },
};
