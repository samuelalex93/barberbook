export enum UserRole {
  OWNER = "OWNER",
  MANAGER = "MANAGER",
  BARBER = "BARBER",
  CLIENT = "CLIENT",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  barbershop_id: string | null;
  refresh_token: string | null;
  created_at: Date;
}

export type CreateUserInput = Omit<User, "id" | "created_at" | "refresh_token"> & {
  refresh_token?: string | null;
};

export type UpdateUserInput = Partial<Omit<User, "id" | "created_at">>;

export type UserResponse = Omit<User, "password">;
