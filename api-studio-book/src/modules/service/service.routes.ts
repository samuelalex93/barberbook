import { Router } from "express";
import { ServiceController } from "./service.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";
import { authorize } from "../../shared/middlewares/rbac.middleware";

const serviceRouter = Router();

// Public routes
serviceRouter.get("/", ServiceController.findAll);
serviceRouter.get("/:id", ServiceController.findById);
serviceRouter.get("/barbershop/:barbershop_id", ServiceController.findByBarbershopId);

// Protected routes
serviceRouter.post(
  "/barbershop/:barbershop_id",
  authMiddleware,
  authorize(["OWNER", "MANAGER"]),
  ServiceController.create
);
serviceRouter.patch(
  "/:id",
  authMiddleware,
  authorize(["OWNER", "MANAGER"]),
  ServiceController.update
);
serviceRouter.delete(
  "/:id",
  authMiddleware,
  authorize(["OWNER", "MANAGER"]),
  ServiceController.delete
);

export default serviceRouter;
