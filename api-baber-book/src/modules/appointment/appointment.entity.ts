export interface Appointment {
  id: string;
  barber_id: string;
  client_id: string;
  barbershop_id: string;
  service_id: string;
  start_time: Date;
  end_time: Date;
  price: number;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  created_at: Date;
}

export type CreateAppointmentInput = Omit<Appointment, "id" | "created_at">;

export type UpdateAppointmentInput = Partial<Omit<Appointment, "id" | "created_at" | "barber_id" | "client_id">>;

export type AppointmentResponse = Appointment;
