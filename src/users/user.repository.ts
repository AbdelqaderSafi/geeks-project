import { BaseRepository } from "../shared/base.repository";
import { User } from "./user.entity";

export class UserRepository extends BaseRepository<User> {
  findByEmail(email: string): User | undefined {
    return this.findAll().find((u) => u.email === email);
  }
}
