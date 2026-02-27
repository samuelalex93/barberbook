import bcrypt from "bcryptjs";
import { UserRepository } from "../user/user.repository";
import { generateToken, validateJwt } from "../../shared/hash/jwt";
import { AppError } from "../../shared/errors/AppError";
import { UserRole } from "../user/user.entity";

export class AuthService {
  static async register(name: string, email: string, password: string, role: UserRole = UserRole.CLIENT) {
    const emailExists = await UserRepository.exists(email);
    if (emailExists) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    } as any);

    const accessToken = generateToken(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    };
  }

  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateToken(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,
    };
  }

  static async validateToken(token: string) {
    return validateJwt(token);
  }
}