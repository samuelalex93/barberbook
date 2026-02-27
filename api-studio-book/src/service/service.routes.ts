import { authMiddleware } from '../shared/middlewares/auth.midleware';
import { ServiceController } from './service.controller';
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, ServiceController.create);
router.get("/", ServiceController.findAll);
//router.get("/:id", ServiceController.findOne);
router.put("/:id", authMiddleware, ServiceController.update);
router.delete("/:id", authMiddleware, ServiceController.delete);

export default router;