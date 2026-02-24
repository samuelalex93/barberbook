
import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive(),
  duration_minutes: z.number().int().positive(),
  barbershop_id: z.string().uuid()
});
