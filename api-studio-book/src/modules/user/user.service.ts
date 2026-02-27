import { AppError } from "../../shared/errors/AppError";
import { UserRepository } from "./user.repository";
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "./user.dto";
import { User, UserRole } from "./user.entity";

export class UserService {
  static async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const emailExists = await UserRepository.exists(data.email);
    if (emailExists) {
      throw new AppError("Email already in use", 409);
    }

    const user = await UserRepository.create(data as any);
    return UserResponseDTO.fromEntity(user);
  }

  static async findById(id: string): Promise<UserResponseDTO | null> {
    const user = await UserRepository.findById(id);
    if (!user) return null;

    return UserResponseDTO.fromEntity(user);
  }

  static async findByEmail(email: string): Promise<User | null> {
    return UserRepository.findByEmail(email);
  }

  static async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { users, total } = await UserRepository.findAll(limit, offset);

    return {
      data: users.map((user) => UserResponseDTO.fromEntity(user)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async update(
    id: string,
    data: UpdateUserDTO
  ): Promise<UserResponseDTO | null> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await UserRepository.exists(data.email);
      if (emailExists) {
        throw new AppError("Email already in use", 409);
      }
    }

    const updatedUser = await UserRepository.update(id, data);
    if (!updatedUser) return null;

    return UserResponseDTO.fromEntity(updatedUser);
  }

  static async delete(id: string): Promise<void> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await UserRepository.delete(id);
  }

  static async createBarber(
    data: CreateUserDTO,
    managerId: string
  ): Promise<UserResponseDTO> {
    const manager = await UserRepository.findById(managerId);
    if (!manager) {
      throw new AppError("Manager not found", 404);
    }

    if (manager.role !== "MANAGER") {
      throw new AppError("Only managers can create barbers", 403);
    }

    const emailExists = await UserRepository.exists(data.email);
    if (emailExists) {
      throw new AppError("Email already in use", 409);
    }

    const barber = await UserRepository.create({
      ...data,
      role: "BARBER" as UserRole,
      barbershop_id: manager.barbershop_id,
    });

    return UserResponseDTO.fromEntity(barber);
  }

  static async findByRole(role: string) {
    const users = await UserRepository.findByRole(role);
    return users.map((user) => UserResponseDTO.fromEntity(user));
  }

  static async findByBarbershopId(barbershopId: string) {
    const users = await UserRepository.findByBarbershopId(barbershopId);
    return users.map((user) => UserResponseDTO.fromEntity(user));
  }
}