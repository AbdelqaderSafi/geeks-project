import { ZodSchema } from "zod";
import { BadRequestError } from "./errors";

export function parseOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new BadRequestError("Validation error", parsed.error.flatten());
  }
  return parsed.data;
}
