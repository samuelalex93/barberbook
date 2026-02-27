import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional().nullable(),
  price: z.number().positive("Price must be greater than 0"),
  duration_minutes: z.number().int().positive("Duration must be greater than 0"),
});

export const updateServiceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  description: z.string().optional().nullable(),
  price: z.number().positive("Price must be greater than 0").optional(),
  duration_minutes: z.number().int().positive("Duration must be greater than 0").optional(),
});
