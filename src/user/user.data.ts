import { faker } from "@faker-js/faker";
import { IUser } from "./user.entity";
import { creatRandomUser } from "../../seeds/user.seeds";

export const USERS_DATA: IUser[] = faker.helpers.multiple(creatRandomUser, {
  count: 3,
});
