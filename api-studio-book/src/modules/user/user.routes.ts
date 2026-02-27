import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";

const userRouter = Router();

// Public routes
userRouter.get("/", UserController.findAll);
userRouter.get("/:id", UserController.findById);
userRouter.get("/role/:role", UserController.findByRole);
userRouter.get("/barbershop/:barbershopId", UserController.findByBarbershopId);

// Protected routes
userRouter.post("/", authMiddleware, UserController.create);
userRouter.post("/barber", authMiddleware, UserController.createBarber);
userRouter.patch("/:id", authMiddleware, UserController.update);
userRouter.delete("/:id", authMiddleware, UserController.delete);

export default userRouter;