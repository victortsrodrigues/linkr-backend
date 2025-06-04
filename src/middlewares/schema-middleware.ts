import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function schemaValidate(schema: Schema ) {
    return (req: Request,res: Response,next: NextFunction) => {
        const validation = schema.validate(req.body,{abortEarly:false});
        if (validation.error) throw {
            name: "UNPROCESSABLE ENTITY",
            message: validation.error.details.map(detail => detail.message)
        }
        next();
    }
}