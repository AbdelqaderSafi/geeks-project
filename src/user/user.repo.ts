import baseRepo from "../shared/baseRepo";
import { USERS_DATA } from "./user.data";
import { IUser } from "./user.entity";

class UserRepo extends baseRepo<IUser> {
  constructor() {
    super(USERS_DATA);
  }

  findByEmail(email: string) {
    return this.findBy("email", email);
  }
}

export default new UserRepo();
