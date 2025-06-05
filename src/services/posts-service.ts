import { Posts } from "@prisma/client";
import { postsRepositorie } from "../repositories/posts-repository";
import urlMetadata from "url-metadata";

async function createNewPost(userId: string, newPost: Posts) {
    const post = postsRepositorie.createPost(userId,newPost);
    return post
}

async function getAllPosts(page:number) {

    const allposts = await postsRepositorie.getPosts(page);
    
    const allPostsMetaData = await Promise.all(allposts.map(async post => {
        const metaDataComplete = await urlMetadata(post.url)
        const img = metaDataComplete['og.image'] ??
                    metaDataComplete['twitter:image'] ??
                    metaDataComplete.image ??
                    metaDataComplete['busca:image'] ??
                    null
        const metaData = {
            dataTitle: metaDataComplete.title,
            dataDescription: metaDataComplete.description,
            dataImage: img
        }
        return {...post,metaData}
    })
    )
    return allPostsMetaData
}

export const postsService = {
    createNewPost,
    getAllPosts
}