import "dotenv/config";
import express from "express";
import authRoutes, { userRepo } from "./auth/auth.routes";
import { seedAdmin } from "./auth/auth.utils";
import userRoutes from "./users/user.routes";
import courseRoutes from "./courses/course.routes";
import { notFoundHandler, errorHandler } from "./shared/middleware";

const app = express();
app.use(express.json());

seedAdmin(userRepo);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
