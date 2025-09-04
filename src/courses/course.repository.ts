import { BaseRepository } from "../shared/base.repository";
import { Course } from "./course.entity";

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    super(); 
  }
}
