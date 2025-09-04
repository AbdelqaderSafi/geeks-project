import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "../users/user.repository";

const router = Router();

const userRepo = new UserRepository();
const service = new AuthService(userRepo);
const controller = new AuthController(service);

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;

export { userRepo };
