import { notFoundError } from "../errors/notFoundError";
import { conflictError } from "../errors/conflictError";
import { BodySignIn, BodySignUp } from "../protocols/authProtocol";
import authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import { unauthorizedError } from "../errors/unauthorizedError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function signUp(body: BodySignUp) {
  const { username, email, password, image } = body;
  const userExists = await authRepository.findByEmail(email);
  if (userExists) throw conflictError("User");

  await authRepository.createUser(username, email, password, image);
}

async function signIn(body: BodySignIn) {
  const { email, password } = body;
  const user = await authRepository.findByEmail(email);
  if (!user) throw notFoundError("Email");

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) throw unauthorizedError("Password");
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 86400 });
  return token;
}

const authServices = {
  signUp,
  signIn,
};

export default authServices;
