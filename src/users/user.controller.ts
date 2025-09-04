import { Request, Response } from "express";
import { UserRepository } from "./user.repository";
import { requireRoles } from "../shared/middleware";

export class UserController {
  constructor(private users: UserRepository) {}

  getMe = (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const me = this.users.findById(req.user.id);
    if (!me) return res.status(404).json({ error: "User not found" });

    return res.json(me);
  };

  updateMe = (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const { name, password } = req.body;
    const updated = this.users.update(req.user.id, { name, password });
    if (!updated) return res.status(404).json({ error: "User not found" });

    return res.json(updated);
  };

  createCoach = [
    requireRoles("ADMIN"),
    (req: Request, res: Response) => {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const exists = this.users.findByEmail(email);
      if (exists)
        return res.status(400).json({ error: "Email already exists" });

      const coach = this.users.create({
        name,
        email,
        password,
        role: "COACH",
      } as any);

      return res.status(201).json(coach);
    },
  ];
}
