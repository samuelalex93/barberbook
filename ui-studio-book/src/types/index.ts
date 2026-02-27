export type UserRole = 'CLIENT' | 'BARBER' | 'OWNER' | 'MANAGER';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  barbershop_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  barbershop_id?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface Barbershop {
  id: string;
  name: string;
  description?: string;
  address: string;
  phone: string;
  owner_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBarbershopRequest {
  name: string;
  description?: string;
  address: string;
  phone: string;
}

export interface UpdateBarbershopRequest {
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  barbershop_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateServiceRequest {
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
}

export interface UpdateServiceRequest {
  name?: string;
  description?: string;
  price?: number;
  duration_minutes?: number;
}

export interface Appointment {
  id: string;
  service_id: string;
  barber_id: string;
  client_id: string;
  barbershop_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAppointmentRequest {
  service_id: string;
  start_time: string;
  end_time: string;
}

export interface UpdateAppointmentRequest {
  status?: AppointmentStatus;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
