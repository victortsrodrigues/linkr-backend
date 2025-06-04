import { Posts } from "@prisma/client";
import prisma from "../config/database";

export async function createPost(userId: string, newPost: Posts) {
    return await prisma.posts.create({
        data:{
            description: newPost.description ?? "",
            url: newPost.url,
            userId
        }
    })
}   