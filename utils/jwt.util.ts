import * as jwt from "jsonwebtoken";
import { TJwtPayload } from "../@types";
import { getEnvOrThrow } from "./util";

const secret = getEnvOrThrow("JWT_SECRET");

export const generateToken = (payload: TJwtPayload) => {
  return jwt.sign(payload, secret);
};

export const verifyToken = (token: string): TJwtPayload => {
  return jwt.verify(token, secret) as TJwtPayload;
};
