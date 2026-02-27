export class ServiceRepository {
  static create(data: any) {
    return Service.create(data);
  }

  static findAll(barbershop_id: object) {
    return Service.findAll({ where: { barbershop_id } });
  }

  static update(id: string, data: any) {
    return Service.update(data, { where: { id } });
  }

  static delete(id: object) {
    return Service.destroy({ where: { id } });
  }
}