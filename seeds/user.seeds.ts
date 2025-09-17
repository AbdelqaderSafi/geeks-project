import { faker } from "@faker-js/faker";
import { IUser } from "../src/user/user.entity";

const roles = ["admin", "coach", "student"] as const;

export function creatRandomUser() {
  const randomUser: IUser = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(roles),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return randomUser;
}
