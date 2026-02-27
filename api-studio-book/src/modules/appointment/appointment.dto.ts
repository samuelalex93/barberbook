import { Appointment } from "./appointment.entity";

export class CreateAppointmentDTO {
  service_id!: string;
  start_time!: Date;
  end_time!: Date;
}

export class UpdateAppointmentDTO {
  status?: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  start_time?: Date;
  end_time?: Date;
}

export class AppointmentResponseDTO {
  id!: string;
  barber_id!: string;
  client_id!: string;
  barbershop_id!: string;
  service_id!: string;
  start_time!: Date;
  end_time!: Date;
  price!: number;
  status!: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  created_at!: Date;

  static fromEntity(appointment: Appointment): AppointmentResponseDTO {
    const dto = new AppointmentResponseDTO();
    dto.id = appointment.id;
    dto.barber_id = appointment.barber_id;
    dto.client_id = appointment.client_id;
    dto.barbershop_id = appointment.barbershop_id;
    dto.service_id = appointment.service_id;
    dto.start_time = appointment.start_time;
    dto.end_time = appointment.end_time;
    dto.price = appointment.price;
    dto.status = appointment.status;
    dto.created_at = appointment.created_at;
    return dto;
  }
}
