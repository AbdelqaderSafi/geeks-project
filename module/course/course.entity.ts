import { IBaseData } from "../../common/repos/types";

export interface ICourse extends IBaseData {
  title: string;
  description: string;
  image?: string;
}
