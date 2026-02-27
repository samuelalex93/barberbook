import { Request, Response } from "express";
import { ServiceService } from "./service.service";

export class ServiceController {
  static async create(req: Request, res: Response) {
    const service = await ServiceService.create(req.body);
    res.status(201).json(service);
  }

  static async findAll(req: Request, res: Response) {
    const barbershopId = req.params.barbershop_id as string
    const list = await ServiceService.findAll(barbershopId);
    res.json(list);
  }

  static async update(req: Request, res: Response) {
    const body = req.body
    const id = req.params.id as string
    await ServiceService.update(id, body);
    res.json({ message: "Updated successfully" });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id as string
    await ServiceService.delete(id);
    res.json({ message: "Deleted successfully" });
  }
}