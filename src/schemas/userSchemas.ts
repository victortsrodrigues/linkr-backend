import joi from "joi";
import { UserProfile } from "../protocols/userProtocol";

export const editProfileSchema = joi.object<UserProfile>({
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
        "string.base": "Age must be a number",
        "string.min": "Age must have at least 0 years old",
        "string.max": "Age must have at most 100 years old",
    }),
    bio: joi.string().allow(null,"").optional().messages({
        "string.base": "Bio must be a string",
    }),
});