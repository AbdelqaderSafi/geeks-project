import BaseRepo from "../shared/baseRepo";
import { ICourse } from "./course.entity";
import { COURSES_DATA } from "./course.data";

class CourseRepo extends BaseRepo<ICourse> {
  constructor() {
    super(COURSES_DATA);
  }
}

export default new CourseRepo();
