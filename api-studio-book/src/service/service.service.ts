import { ServiceRepository } from "./service.repository";

export class ServiceService {
  static create(data: any) {
    return ServiceRepository.create(data);
  }

  static findAll(barbershop_id: string) {
    return ServiceRepository.findAll({ where: { barbershop_id } });
  }

  static update(id: string, data: any) {
    return ServiceRepository.update(data, { where: { id } });
  }

  static delete(id: string) {
    return ServiceRepository.delete({ where: { id } });
  }
}