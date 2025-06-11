import joi from "joi";
import { UserProfile } from "../protocols/userProtocol";

export const userSchema = joi.object<UserProfile>({
    username: joi.string().trim().min(2).required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username cannot be empty",
        "string.min": "Username must have at least 2 characters",
        "any.required": "Username is required",
    }),
    image: joi.string().trim().uri().required().messages({
        "string.uri": "Please provide a valid image URL",
        "string.empty": "Image URL cannot be empty",
        "any.required": "Image URL is required",
    }),
    age: joi.number().min(0).max(100).messages({
        "string.base": "age must be a number",
        "number.min": "age must have at least 0 years old",
        "number.max": "age must have at most 100 years old",
    }),
    about: joi.string().trim().messages({
        "string.base": "text about must be a string",
    })
});