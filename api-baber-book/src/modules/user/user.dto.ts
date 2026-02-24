import { User, UserRole } from "./user.entity";

export class CreateUserDTO {
  name!: string;
  email!: string;
  password!: string;
  role: UserRole = UserRole.CLIENT;
  barbershop_id?: string | null;
}

export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  barbershop_id?: string | null;
}

export class UserResponseDTO {
  id!: string;
  name!: string;
  email!: string;
  role!: UserRole;
  barbershop_id!: string | null;
  created_at!: Date;

  static fromEntity(user: User): UserResponseDTO {
    const dto = new UserResponseDTO();
    dto.id = user.id;
    dto.name = user.name;
    dto.email = user.email;
    dto.role = user.role;
    dto.barbershop_id = user.barbershop_id;
    dto.created_at = user.created_at;
    return dto;
  }
}
