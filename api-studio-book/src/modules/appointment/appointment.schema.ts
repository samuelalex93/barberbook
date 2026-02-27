import { z } from "zod";

export const createAppointmentSchema = z.object({
  service_id: z.string().uuid("Invalid service ID"),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
}).refine((data) => data.end_time > data.start_time, {
  message: "End time must be after start time",
  path: ["end_time"],
});

export const updateAppointmentSchema = z.object({
  status: z.enum(["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED"]).optional(),
  start_time: z.coerce.date().optional(),
  end_time: z.coerce.date().optional(),
}).refine(
  (data) => {
    if (data.start_time && data.end_time) {
      return data.end_time > data.start_time;
    }
    return true;
  },
  {
    message: "End time must be after start time",
    path: ["end_time"],
  }
);
