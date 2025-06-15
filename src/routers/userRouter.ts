import { Router } from "express";
import { validate_token } from "../middlewares/validTokenMiddleware";
import userController from "../controllers/userController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { editProfileSchema } from "../schemas/userSchemas";

const userRouter = Router();

// Rotas de perfil de usuário
userRouter.get("/user/:id", validate_token, userController.getUserProfile);
userRouter.get("/posts/user/:id", validate_token, userController.getUserPosts);
userRouter.get("/myprofile", validate_token, userController.getMyProfile);

userRouter.get("/linkers", validate_token, userController.usersForSearch);

// Rotas de follow/unfollow
userRouter.post("/follow/:id", validate_token, userController.followUser);
userRouter.delete("/follow/:id", validate_token, userController.unfollowUser);
userRouter.get("/follow/status/:id", validate_token, userController.getFollowStatus);

// Rotas de seguidores e seguindo
userRouter.get("/followers/:id", validate_token, userController.getFollowers);
userRouter.get("/following/:id", validate_token, userController.getFollowing);

userRouter.put("/myprofile", validate_token, validateSchema(editProfileSchema),userController.updateMyProfile);

export default userRouter;
