import { NextFunction, Request, Response } from "express";

type CustomError = Error & { type?: string };

export default function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error.type === "conflict") {
    res.status(409).send(error.message);
    return;
  }
  if (error.type === "notFound") {
    res.status(404).send(error.message);
    return;
  }
  if (error.type === "unauthorized") {
    res.status(401).send(error.message);
    return;
  }
  if (error.type === "badRequest") {
    res.status(400).send(error.message);
    return;
  }
  res.sendStatus(500);
}
