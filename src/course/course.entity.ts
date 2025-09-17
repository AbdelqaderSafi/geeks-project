import { IBaseData } from "../shared/types";

export interface ICourse extends IBaseData {
  title: string;
  description: string;
  image?: string;
}
