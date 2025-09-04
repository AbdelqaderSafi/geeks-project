import { Course } from "./course.entity";
import { CourseRepository } from "./course.repository";

export class CourseService {
  constructor(private repo: CourseRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  create(course: Course) {
    return this.repo.create(course);
  }

  update(id: string, data: Partial<Course>) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
