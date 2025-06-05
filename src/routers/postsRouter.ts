import { postsController } from "../controllers/postsController";
import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { validate_token } from "../middlewares/validTokenMiddleware";
import { newPostSchema } from "../schemas/postsSchema";

const postsRouter = Router();

postsRouter.post("/newpost", validate_token, validateSchema(newPostSchema), postsController.createPost)
postsRouter.get("/allposts", validate_token, postsController.getAllPosts)

export default postsRouter;