import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import postsRouter from "./routers/posts-router";
import errorHandlingMiddleware from "./middlewares/error-handle-middleware";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send("I'm ok!");
  });

app.use(postsRouter)
app.use(errorHandlingMiddleware)


const port = process.env.PORT || 5000
app.listen(port,()=>{console.log(`Servidor rodando na porta: ${port}`)})