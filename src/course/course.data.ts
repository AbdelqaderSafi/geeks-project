import { createRandomCourse } from "../../seeds/course.seed";
import { ICourse } from "./course.entity";
import { faker } from "@faker-js/faker";

export const COURSES_DATA: ICourse[] = faker.helpers.multiple(
  createRandomCourse,
  {
    count: 5,
  }
);
