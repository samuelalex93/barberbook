export interface Barbershop {
  id: string;
  name: string;
  description: string | null;
  address: string;
  phone: string | null;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateBarbershopInput = Omit<Barbershop, "id" | "created_at" | "updated_at">;

export type UpdateBarbershopInput = Partial<Omit<Barbershop, "id" | "created_at" | "updated_at" | "owner_id">>;

export type BarbershopResponse = Barbershop;
