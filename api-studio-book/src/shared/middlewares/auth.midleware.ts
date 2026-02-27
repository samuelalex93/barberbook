import { NextFunction, Response, Request } from "express";
import { verifyAccessToken } from "../../modules/auth/auth.jtw";

// export function ensureAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const token = req.headers.authorization?.split(" ")[1]


//   if (!token) {
//     throw new AppError("Token missing", 401)
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET!)

//   req.user = decoded
//   next()
// }

// import { Request, Response, NextFunction } from "express";
// import { verifyAccessToken } from "./jwt";

// export interface AuthRequest extends Request {
//   userId?: string;
// }

export const authMiddleware = (
  req: Request|any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as any;

  if (!authHeader)
    return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};