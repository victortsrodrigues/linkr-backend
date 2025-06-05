import { Posts } from "@prisma/client";
import prisma from "../config/database";

async function createPost(userId: string, newPost: Posts) {
    return await prisma.posts.create({
        data:{
            description: newPost.description ?? "",
            url: newPost.url,
            userId
        }
    })
}

const PAGE_LIMIT = 20

async function getPosts(page: number) {
    const skipPosts = (page - 1) * PAGE_LIMIT;

    return prisma.posts.findMany({
        skip: skipPosts,
        take: PAGE_LIMIT
    })
}

export const postsRepositorie = {
    createPost,
    getPosts
}