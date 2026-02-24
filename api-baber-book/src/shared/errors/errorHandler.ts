import { Request, Response, NextFunction } from "express";
import { NotFoundError, InvalidPasswordError, ForbiddenError } from "./CustomErrors";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  // if (err instanceof ValidateError) {
  //   console.warn(`Validation Error for ${req.path}:`, err?.fields);
  //   return res.status(422).json({
  //     message: "Validation Failed",
  //     details: err?.fields,
  //   });
  // }

  if (err instanceof NotFoundError || err instanceof InvalidPasswordError || err instanceof ForbiddenError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    console.error(`Unexpected Error for ${req.path}:`, err.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}
