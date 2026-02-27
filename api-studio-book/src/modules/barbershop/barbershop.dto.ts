import { Barbershop } from "./barbershop.entity";

export class CreateBarbershopDTO {
  name!: string;
  description?: string | null;
  address!: string;
  phone?: string | null;
}

export class UpdateBarbershopDTO {
  name?: string;
  description?: string | null;
  address?: string;
  phone?: string | null;
}

export class BarbershopResponseDTO {
  id!: string;
  name!: string;
  description!: string | null;
  address!: string;
  phone!: string | null;
  owner_id!: string;
  created_at!: Date;
  updated_at!: Date;

  static fromEntity(barbershop: Barbershop): BarbershopResponseDTO {
    const dto = new BarbershopResponseDTO();
    dto.id = barbershop.id;
    dto.name = barbershop.name;
    dto.description = barbershop.description;
    dto.address = barbershop.address;
    dto.phone = barbershop.phone;
    dto.owner_id = barbershop.owner_id;
    dto.created_at = barbershop.created_at;
    dto.updated_at = barbershop.updated_at;
    return dto;
  }
}
