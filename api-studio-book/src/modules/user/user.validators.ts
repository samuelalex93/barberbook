
import { z } from "zod";
import { UserRole } from "./user.entity";

export const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum([UserRole.OWNER, UserRole.MANAGER, UserRole.BARBER, UserRole.CLIENT])
    .optional()
    .default(UserRole.CLIENT),
  barbershop_id: z.string().uuid("Invalid barbershop ID").optional().nullable(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z
    .enum([UserRole.OWNER, UserRole.MANAGER, UserRole.BARBER, UserRole.CLIENT])
    .optional(),
  barbershop_id: z.string().uuid("Invalid barbershop ID").optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function validateUserRequest(data: any) {
  try {
    return createUserSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error?.issues?.[0].message);
    }
    throw error;
  }
}
