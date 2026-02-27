import { Router } from "express";
import { BarbershopController } from "./barbershop.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";
import { authorize } from "../../shared/middlewares/rbac.middleware";

const barbershopRouter = Router();

// Public routes
barbershopRouter.get("/", BarbershopController.findAll);
barbershopRouter.get("/:id", BarbershopController.findOne);
barbershopRouter.get("/owner/:owner_id", BarbershopController.findByOwnerId);

// Protected routes
barbershopRouter.post(
  "/",
  authMiddleware,
  authorize(["OWNER", "MANAGER"]),
  BarbershopController.create
);
barbershopRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["OWNER", "MANAGER"]),
  BarbershopController.update
);
barbershopRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["OWNER", "MANAGER"]),
  BarbershopController.delete
);

export default barbershopRouter;