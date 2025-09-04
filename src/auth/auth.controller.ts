import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schemas";

export class AuthController {
  constructor(private service: AuthService) {}

  register = (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    try {
      const result = this.service.register(parsed.data);
      return res.status(201).json(result);
    } catch (e: any) {
      return res.status(400).json({ error: e.message });
    }
  };

  login = (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    try {
      const result = this.service.login(parsed.data);
      return res.json(result);
    } catch (e: any) {
      return res.status(401).json({ error: e.message });
    }
  };
}
