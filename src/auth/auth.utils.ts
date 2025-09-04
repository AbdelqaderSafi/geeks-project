import jwt from "jsonwebtoken";
import { UserRepository } from "../users/user.repository";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function generateToken(payload: {
  id: string;
  role: "ADMIN" | "COACH" | "STUDENT";
}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as {
    id: string;
    role: "ADMIN" | "COACH" | "STUDENT";
  };
}

export function seedAdmin(userRepo: UserRepository) {
  const email = "admin@no.com";
  const already = userRepo.findByEmail(email);
  if (already) return already;

  return userRepo.create({
    name: "Admin",
    email,
    password: "admin123", 
    role: "ADMIN",
  } as any);
}
