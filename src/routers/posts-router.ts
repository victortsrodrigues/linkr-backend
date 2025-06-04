import { createPost } from "../controllers/posts-controller";
import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware";
import { validate_token } from "../middlewares/valid-token-middleware";
import { newPostSchema } from "../schemas/posts-schema";

const postsRouter = Router();
postsRouter.post("/newpost",validate_token,schemaValidate(newPostSchema),createPost)

export default postsRouter;