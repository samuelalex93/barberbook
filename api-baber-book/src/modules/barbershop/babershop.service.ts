import { BarbershopRepository } from "./barbershop.repository";
import { CreateBarbershopDTO, UpdateBarbershopDTO, BarbershopResponseDTO } from "./barbershop.dto";
import { AppError } from "../../shared/errors/AppError";

export class BarbershopService {
  static async create(
    data: CreateBarbershopDTO,
    owner_id: string
  ): Promise<BarbershopResponseDTO> {
    const existing = await BarbershopRepository.findByNameAndAddress(data.name, data.address);
    if (existing) {
      throw new AppError("Barbershop already exists at this address", 409);
    }

    const barbershop = await BarbershopRepository.create({
      ...data,
      owner_id,
    } as any);

    return BarbershopResponseDTO.fromEntity(barbershop);
  }

  static async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { barbershops, total } = await BarbershopRepository.findAll(limit, offset);

    return {
      data: barbershops.map((b) => BarbershopResponseDTO.fromEntity(b)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async findById(id: string): Promise<BarbershopResponseDTO | null> {
    const barbershop = await BarbershopRepository.findById(id);
    if (!barbershop) return null;

    return BarbershopResponseDTO.fromEntity(barbershop);
  }

  static async update(
    id: string,
    data: UpdateBarbershopDTO,
    owner_id: string
  ): Promise<BarbershopResponseDTO | null> {
    const barbershop = await BarbershopRepository.findById(id);
    if (!barbershop) {
      throw new AppError("Barbershop not found", 404);
    }

    if (barbershop.owner_id !== owner_id) {
      throw new AppError("Only the owner can update this barbershop", 403);
    }

    const updated = await BarbershopRepository.update(id, data);
    if (!updated) return null;

    return BarbershopResponseDTO.fromEntity(updated);
  }

  static async delete(id: string, owner_id: string): Promise<void> {
    const barbershop = await BarbershopRepository.findById(id);
    if (!barbershop) {
      throw new AppError("Barbershop not found", 404);
    }

    if (barbershop.owner_id !== owner_id) {
      throw new AppError("Only the owner can delete this barbershop", 403);
    }

    await BarbershopRepository.delete(id);
  }

  static async findByOwnerId(owner_id: string) {
    const barbershops = await BarbershopRepository.findByOwnerId(owner_id);
    return barbershops.map((b) => BarbershopResponseDTO.fromEntity(b));
  }
}