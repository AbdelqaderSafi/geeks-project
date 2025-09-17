import { IBaseData } from "../../shared/types";
import { ICourse } from "../course.entity";

export type CreatCourseDTO = Omit<ICourse, keyof IBaseData>;

export type UpdateCourseDTO = Omit<Partial<ICourse>, keyof IBaseData>;
