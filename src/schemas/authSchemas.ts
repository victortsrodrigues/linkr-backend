import joi from "joi";
import { BodySignIn, BodySignUp } from "protocols/authProtocol";

export const signUpSchema = joi.object<BodySignUp>({
  username: joi.string().trim().min(2).required().messages({
    "string.base": "Username must be a string",
    "string.empty": "Username cannot be empty",
    "string.min": "Username must have at least 2 characters",
    "any.required": "Username is required",
  }),
  email: joi.string().trim().email().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: joi.string().trim().min(6).required().messages({
    "string.min": "Password must have at least 6 characters",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
});

export const signInSchema = joi.object<BodySignIn>({
  email: joi.string().trim().email().required().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  password: joi.string().trim().min(6).required().messages({
    "string.min": "Password must have at least 6 characters",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
  }),
});