import { Request, Response } from "express";
import { ServiceService } from "./service.service";
import { AppError } from "../../shared/errors/AppError";

export class ServiceController {
  static async create(req: Request, res: Response) {
    try {
      const { barbershop_id } = req.params;

      if (!barbershop_id) {
        return res.status(400).json({ message: "Barbershop ID is required" });
      }

      const service = await ServiceService.create(req.body, barbershop_id as string);
      return res.status(201).json(service);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await ServiceService.findAll(page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await ServiceService.findById(id as string);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.json(service);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByBarbershopId(req: Request, res: Response) {
    try {
      const { barbershop_id } = req.params;
      const services = await ServiceService.findByBarbershopId(barbershop_id as string);
      return res.json(services);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = await ServiceService.update(id as string, req.body);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.json(service);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ServiceService.delete(id as string);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
