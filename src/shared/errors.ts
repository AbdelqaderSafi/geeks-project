export class CustomError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }

  toJSON() {
    return {
      error: this.message,
      ...(this.details ? { details: this.details } : {}),
    };
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Bad request", details?: unknown) {
    super(400, message, details);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(401, message, details);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = "Forbidden", details?: unknown) {
    super(403, message, details);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Not found", details?: unknown) {
    super(404, message, details);
  }
}

import { ZodError } from "zod";
export function zodToBadRequest(err: unknown): CustomError {
  if (err instanceof ZodError) {
    return new BadRequestError("Validation error", err.flatten());
  }
  return new BadRequestError(String(err));
}
