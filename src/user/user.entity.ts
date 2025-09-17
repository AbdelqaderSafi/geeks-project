import { TRoles } from "../../@types";
import { IBaseData } from "../shared/types";

export interface IUser extends IBaseData {
  name: string;
  email: string;
  password: string;
  role: TRoles;
}
