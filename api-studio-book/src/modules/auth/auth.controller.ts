import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AppError } from "../../shared/errors/AppError";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role, business_id } = req.body; // business may be provided for owners/managers

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const user = await AuthService.register(name, email, password, role);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const tokens = await AuthService.login(email, password);
      return res.json(tokens);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}