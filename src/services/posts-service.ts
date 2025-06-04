import { Posts } from "@prisma/client";
import { createPost } from "../repositories/posts-repository";

export async function createNewPost(userId: number, newPost: Posts) {
    const post = createPost(userId,newPost);
    return post
}