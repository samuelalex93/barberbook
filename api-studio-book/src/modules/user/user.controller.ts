import { Request, Response } from "express";
import { UserService } from "./user.service";
import { AppError } from "../../shared/errors/AppError";

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id as string);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await UserService.findAll(page, limit);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.update(id as string, req.body);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
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
      await UserService.delete(id as string);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createBarber(req: Request, res: Response) {
    try {
      const managerId = (req as any).user?.id;
      if (!managerId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const barber = await UserService.createBarber(req.body, managerId);
      return res.status(201).json(barber);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByRole(req: Request, res: Response) {
    try {
      const { role } = req.params;
      const users = await UserService.findByRole(role as any);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findByBarbershopId(req: Request, res: Response) {
    try {
      const { barbershopId } = req.params;
      const users = await UserService.findByBarbershopId(barbershopId as string);
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}