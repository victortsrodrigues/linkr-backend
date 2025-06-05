import { PostsDTO } from "../protocols/postProtocol"
import joi from "joi";

export const newPostSchema = joi.object<PostsDTO>({
    description: joi.string().min(0),
    url: joi.string().uri().required()
})