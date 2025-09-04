import { UserRepository } from "../users/user.repository";
import { RegisterDTO, LoginDTO } from "./auth.schemas";
import { generateToken } from "./auth.utils";

export class AuthService {
  constructor(private users: UserRepository) {}

  register(data: RegisterDTO) {
    const exists = this.users.findByEmail(data.email);
    if (exists) throw new Error("Email already registered");

    const user = this.users.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role ?? "STUDENT",
    } as any);

    const token = generateToken({ id: user.id, role: user.role });
    return { token, user };
  }

  login(data: LoginDTO) {
    const user = this.users.findByEmail(data.email);
    if (!user || user.password !== data.password) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken({ id: user.id, role: user.role });
    return { token, user };
  }
}
