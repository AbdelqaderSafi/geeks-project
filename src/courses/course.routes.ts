import { Router } from "express";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { authMiddleware, requireRoles } from "../shared/middleware";
import { UserRepository } from "../users/user.repository";

const router = Router();

const courseRepo = new CourseRepository();
const controller = new CourseController(courseRepo);
// const controller = new CourseController(courseService);

const userRepo = new UserRepository();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

router.post(
  "/",
  authMiddleware(userRepo),
  requireRoles("COACH", "ADMIN"),
  controller.create
);

router.put(
  "/:id",
  authMiddleware(userRepo),
  requireRoles("COACH", "ADMIN"),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware(userRepo),
  requireRoles("COACH", "ADMIN"),
  controller.delete
);

export default router;
