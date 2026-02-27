import { Request, Response } from "express";
import { BarbershopService } from "./babershop.service";
import { AppError } from "../../shared/errors/AppError";

export class BarbershopController {
  static async create(req: Request, res: Response) {
    try {
      const owner_id = (req as any).user?.id;
      if (!owner_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const barbershop = await BarbershopService.create(req.body, owner_id);
      return res.status(201).json(barbershop);
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

      const result = await BarbershopService.findAll(page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const barbershop = await BarbershopService.findById(id as string);

      if (!barbershop) {
        return res.status(404).json({ message: "Barbershop not found" });
      }

      return res.json(barbershop);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const owner_id = (req as any).user?.id;

      if (!owner_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const barbershop = await BarbershopService.update(id as string, req.body, owner_id);

      if (!barbershop) {
        return res.status(404).json({ message: "Barbershop not found" });
      }

      return res.json(barbershop);
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
      const owner_id = (req as any).user?.id;

      if (!owner_id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      await BarbershopService.delete(id as string, owner_id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByOwnerId(req: Request, res: Response) {
    try {
      const { owner_id } = req.params;
      const barbershops = await BarbershopService.findByOwnerId(owner_id as string);
      return res.json(barbershops);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}