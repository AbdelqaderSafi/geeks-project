import { IEnv } from "../@types";

export const getEnvOrThrow = <K extends keyof IEnv>(envName: K): IEnv[K] => {
  const varValue = process.env[envName];
  if (!varValue) throw new Error("env is missing " + envName);
  return varValue;
};
