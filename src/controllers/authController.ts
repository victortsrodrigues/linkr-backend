import { Request, Response } from "express";
import { BodySignIn, BodySignUp } from "../protocols/authProtocol";
import authServices from "../services/authServices";

async function signUp(req: Request, res: Response) {
  const body = req.body as BodySignUp;
  await authServices.signUp(body);
  res.sendStatus(201);
}

async function signIn(req: Request, res: Response) {
  const body = req.body as BodySignIn;
  const token = await authServices.signIn(body);
  res.status(200).send(token);
}

async function usersSuggestions(req: Request, res: Response) {
  const user = res.locals.user;
  const suggestions = await authServices.usersSuggestions(Number(user.id))
  res.status(204).send(suggestions);
}

const authController = {
  signUp,
  signIn,
  usersSuggestions,
};

export default authController;
