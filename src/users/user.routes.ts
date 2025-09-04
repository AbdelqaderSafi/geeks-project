import { Router } from "express";
import { authMiddleware } from "../auth/auth.middleware";
import { userRepo } from "../auth/auth.routes";
import { UserController } from "./user.controller";

const router = Router();
const controller = new UserController(userRepo);

router.use(authMiddleware(userRepo));

router.get("/me", controller.getMe);
router.put("/me", controller.updateMe);
router.post("/coach", controller.createCoach);

export default router;
