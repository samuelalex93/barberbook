export interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  barbershop_id: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateServiceInput = Omit<Service, "id" | "created_at" | "updated_at">;

export type UpdateServiceInput = Partial<Omit<Service, "id" | "created_at" | "updated_at" | "barbershop_id">>;

export type ServiceResponse = Service;
