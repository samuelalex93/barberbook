
import { Router } from "express";
import { authorize } from "./shared/middlewares/rbac.middleware";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes";
import barbershopRouter from "./modules/barbershop/babershop.route";
import serviceRouter from "./modules/service/service.routes";
import appointmentRouter from "./modules/appointment/appointment.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Barber SaaS API running" });
});

// Auth routes
router.use("/auth", authRouter);

// User routes
router.use("/users", userRouter);

// Barbershop routes
router.use("/barbershops", barbershopRouter);

// Service routes
router.use("/services", serviceRouter);

// Appointment routes
router.use("/appointments", appointmentRouter);

// router.get(
//   "/user",
//   authorize(["ADMIN", "OWNER"]), user
// );

// router.post(
//   "/services",
//   authorize(["ADMIN", "OWNER"]),
//   validate(createServiceSchema),
//   (req, res) => {
//     res.json({ message: "Service created" });
//   }
// );

// router.get("/admin-area", authorize(["ADMIN"]), (req, res) => {
//   res.json({ message: "Admin only" });
// });

export default router;
