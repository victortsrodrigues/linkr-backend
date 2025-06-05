import { NextFunction, Request, Response } from "express";

export default function errorHandlingMiddleware(error: Error, req: Request, res: Response, next: NextFunction){
    if (error.name === "UNAUTHORIZED") return res.status(401).send(error.message);

    return res.status(500).send(error.message)
}