import { Posts } from "@prisma/client";
import joi from "joi";

export const newPostSchema = joi.object<Posts>({
    description: joi.string().min(0),
    url: joi.string().uri().required()
})