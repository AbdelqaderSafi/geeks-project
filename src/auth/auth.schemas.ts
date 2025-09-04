import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  // Default role = STUDENT
  role: z.enum(["ADMIN", "COACH", "STUDENT"]).optional().default("STUDENT"),
});
export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginDTO = z.infer<typeof loginSchema>;
