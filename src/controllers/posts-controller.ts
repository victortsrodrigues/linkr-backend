import { Request, Response } from "express";
import { createNewPost } from "../services/posts-service";

export async function createPost(req: Request, res: Response) {
    const newPost = req.body;
    const user = res.locals.user;

    const post = await createNewPost(user.id,newPost)

    res.status(201).send(post)
}