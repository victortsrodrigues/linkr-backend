import express, { json, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import authRouter from "./routers/authRouter";
import postsRouter from "./routers/postsRouter";
import userRouter from "./routers/userRouter";
import errorHandler from "./middlewares/errorHandlerMiddleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("I'm OK");
});

// Routes
app.use(authRouter);
app.use(postsRouter);
app.use(userRouter);
app.use(errorHandler);

export default app;
