import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { validate_token } from "../middlewares/validTokenMiddleware";
import { userSchema } from "../schemas/userSchemas";
import { userController } from "../controllers/userController";

const userRouter = Router();

userRouter.put("/user/my-profile",validate_token,validateSchema(userSchema),userController.editProfile);

export default userRouter;