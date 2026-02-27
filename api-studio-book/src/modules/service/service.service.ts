import { ServiceRepository } from "./service.repository";
import { CreateServiceDTO, UpdateServiceDTO, ServiceResponseDTO } from "./service.dto";
import { AppError } from "../../shared/errors/AppError";

export class ServiceService {
  static async create(
    data: CreateServiceDTO,
    barbershop_id: string
  ): Promise<ServiceResponseDTO> {
    if (!data.name || !data.price || !data.duration_minutes) {
      throw new AppError("Missing required fields", 400);
    }

    const service = await ServiceRepository.create({
      ...data,
      barbershop_id,
    } as any);

    return ServiceResponseDTO.fromEntity(service);
  }

  static async findAll(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    const { services, total } = await ServiceRepository.findAll(limit, offset);

    return {
      data: services.map((s) => ServiceResponseDTO.fromEntity(s)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async findById(id: string): Promise<ServiceResponseDTO | null> {
    const service = await ServiceRepository.findById(id);
    if (!service) return null;

    return ServiceResponseDTO.fromEntity(service);
  }

  static async findByBarbershopId(barbershop_id: string) {
    const services = await ServiceRepository.findByBarbershopId(barbershop_id);
    return services.map((s) => ServiceResponseDTO.fromEntity(s));
  }

  static async update(
    id: string,
    data: UpdateServiceDTO
  ): Promise<ServiceResponseDTO | null> {
    const service = await ServiceRepository.findById(id);
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    const updated = await ServiceRepository.update(id, data);
    if (!updated) return null;

    return ServiceResponseDTO.fromEntity(updated);
  }

  static async delete(id: string): Promise<void> {
    const service = await ServiceRepository.findById(id);
    if (!service) {
      throw new AppError("Service not found", 404);
    }

    await ServiceRepository.delete(id);
  }
}
