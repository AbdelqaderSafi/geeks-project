import { Request, Response } from "express";
import { createCourseSchema, updateCourseSchema } from "./course.schemas";
import { CourseRepository } from "./course.repository";
import { hashPassword, comparePassword } from "../shared/hash.util";

export class CourseController {
  constructor(private courses: CourseRepository) {}

  findAll = (_req: Request, res: Response) => {
    return res.json(this.courses.findAll());
  };

  findOne = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const course = this.courses.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    return res.json(course);
  };

  create = (req: Request, res: Response) => {
    const parsed = createCourseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const course = this.courses.create({
      title: parsed.data.title,
      description: parsed.data.description,
      image: parsed.data.image ?? "",
      createdBy: (req as any).user.id,
    });

    return res.status(201).json(course);
  };

  update = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const parsed = updateCourseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const existing = this.courses.findById(id);
    if (!existing) {
      return res.status(404).json({ error: "Course not found" });
    }

    const updated = this.courses.update(id, {
      title: parsed.data.title ?? "",
      description: parsed.data.description ?? "",
      image: parsed.data.image ?? "",
    });

    return res.json(updated);
  };

  delete = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const deleted = this.courses.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res.json({ message: "Course deleted" });
  };
}
