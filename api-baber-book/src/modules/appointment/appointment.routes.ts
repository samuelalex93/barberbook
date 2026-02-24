import { Router } from "express";
import { AppointmentController } from "./appointment.controller";
import { authMiddleware } from "../../shared/middlewares/auth.midleware";
import { authorize } from "../../shared/middlewares/rbac.middleware";

const appointmentRouter = Router();

// Public routes
appointmentRouter.get("/", AppointmentController.findAll);
appointmentRouter.get("/:id", AppointmentController.findById);
appointmentRouter.get("/barber/:barber_id", AppointmentController.findByBarberId);
appointmentRouter.get("/client/:client_id", AppointmentController.findByClientId);
appointmentRouter.get("/barbershop/:barbershop_id", AppointmentController.findByBarbershopId);

// Protected routes
appointmentRouter.post(
  "/barber/:barber_id/barbershop/:barbershop_id",
  authMiddleware,
  AppointmentController.create
);
appointmentRouter.patch(
  "/:id",
  authMiddleware,
  AppointmentController.update
);
appointmentRouter.delete(
  "/:id",
  authMiddleware,
  AppointmentController.delete
);
appointmentRouter.patch(
  "/:id/cancel",
  authMiddleware,
  AppointmentController.cancel
);

export default appointmentRouter;
