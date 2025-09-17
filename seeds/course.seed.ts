import { faker } from "@faker-js/faker";
// const { faker } = require("@faker-js/faker");
import { ICourse } from "../src/course/course.entity";

export function createRandomCourse() {
  const randomCourse: ICourse = {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentence(8),
    image: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime(),
  };
  return randomCourse;
}
