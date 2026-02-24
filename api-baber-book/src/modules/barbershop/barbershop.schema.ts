
import { z } from "zod";

export const createBarbershopSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional().nullable(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(8, "Phone must be at least 8 characters").optional().nullable(),
});

export const updateBarbershopSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  description: z.string().optional().nullable(),
  address: z.string().min(5, "Address must be at least 5 characters").optional(),
  phone: z.string().min(8, "Phone must be at least 8 characters").optional().nullable(),
});
