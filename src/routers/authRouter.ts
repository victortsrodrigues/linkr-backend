import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchemas";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), authController.signUp);
authRouter.post("/", validateSchema(signInSchema), authController.signIn);

export default authRouter;