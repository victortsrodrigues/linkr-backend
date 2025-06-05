import { Request, Response } from "express";
import { postsService } from "../services/posts-service";

async function createPost(req: Request, res: Response) {
    const newPost = req.body;
    const user = res.locals.user;

    const post = await postsService.createNewPost(Number(user.id),newPost)

    res.status(201).send(post)
}

async function getAllPosts(req: Request, res: Response) {
    let page = Number(req.query.page) || 1;
    if(page<0 || !(page%2===0 || page%2===1)) page = 1
    
    const allposts = await postsService.getAllPosts(page)
    res.status(200).send(allposts)
}

export const postsController = {
    createPost,
    getAllPosts
}