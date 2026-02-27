import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../../config/env";
import { ForbiddenError } from "../errors/CustomErrors";

export interface DecodedToken extends JwtPayload {
  sub: string;
  role: string;
  email: string;
}

export function generateToken(user: any) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: "1h" }
  );
}

export function validateJwt(token: string): DecodedToken {
  try {
    const decoded = jwt.verify(token, jwtSecret) as DecodedToken;
    return decoded;
  } catch (err) {
    throw new ForbiddenError("Invalid or expired token");
  }
}