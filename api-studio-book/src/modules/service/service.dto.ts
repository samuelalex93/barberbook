import { Service } from "./service.entity";

export class CreateServiceDTO {
  name!: string;
  description?: string | null;
  price!: number;
  duration_minutes!: number;
}

export class UpdateServiceDTO {
  name?: string;
  description?: string | null;
  price?: number;
  duration_minutes?: number;
}

export class ServiceResponseDTO {
  id!: string;
  name!: string;
  description!: string | null;
  price!: number;
  duration_minutes!: number;
  barbershop_id!: string;
  created_at!: Date;
  updated_at!: Date;

  static fromEntity(service: Service): ServiceResponseDTO {
    const dto = new ServiceResponseDTO();
    dto.id = service.id;
    dto.name = service.name;
    dto.description = service.description;
    dto.price = service.price;
    dto.duration_minutes = service.duration_minutes;
    dto.barbershop_id = service.barbershop_id;
    dto.created_at = service.created_at;
    dto.updated_at = service.updated_at;
    return dto;
  }
}
