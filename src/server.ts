import "dotenv/config";
import { getEnvOrThrow } from "../utils/util";
import express, { NextFunction, RequestHandler } from "express";
import { Request, Response } from "express";
import { authRouter } from "./auth/auth.routes";
import { responseUnifider } from "../middlewares/responseUndifider";
import { userRouter } from "./user/user.routes";
import CourseRouter from "./course/course.routes";
import { errorHandler } from "../Error/utils/errorHandler";

const PORT = getEnvOrThrow("PORT");

export const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(responseUnifider);
app.use("api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/course", CourseRouter);

app.use((req: Request, res: Response) => {
  const path = req.path;
  res.status(404).json({ message: `route not found: ${path}` });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  errorHandler(err, res);
});
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT);
}
