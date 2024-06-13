// app.js
import express from "express";
import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { addLogger } from "./config/logger_custom.js";
import config from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";

import UsersExtendRouter from "./routes/custom/users.extend.router.js";
import AuthExtendRouter from "./routes/custom/auth.extend.router.js";
import RecipeExtendRouter from "./routes/custom/recipe.extend.router.js";
import RatingExtendRouter from "./routes/custom/rating.extend.router.js";
import CategoryExtendRouter from "./routes/custom/category.extend.router.js";
import CommentExtendRouter from "./routes/custom/comment.extend.router.js";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(addLogger);

const usersExtendRouter = new UsersExtendRouter();
const authExtendRouter = new AuthExtendRouter();
const recipeExtendRouter = new RecipeExtendRouter();
const ratingExtendRouter = new RatingExtendRouter();
const categoryExtendRouter = new CategoryExtendRouter();
const commentExtendRouter = new CommentExtendRouter();

app.use("/api/extend/users", usersExtendRouter.getRouter());
app.use("/api/extend/auth", authExtendRouter.getRouter());
app.use("/api/extend/recipe", recipeExtendRouter.getRouter());
app.use("/api/extend/rating", ratingExtendRouter.getRouter());
app.use("/api/extend/category", categoryExtendRouter.getRouter());
app.use("/api/extend/comment", commentExtendRouter.getRouter());

const port = config.port || 8080;

const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    throw error;
  }
};
mongoInstance();

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
