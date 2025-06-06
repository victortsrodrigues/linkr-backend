import { Posts } from "../protocols/postProtocol";
import prismaClient from "../database/client";

async function createPost(userId: number, newPost: Posts) {
  return await prismaClient.posts.create({
    data: {
      description: newPost.description ?? "",
      url: newPost.url,
      userId,
      dataDescription: newPost.dataDescription,
      dataImage: newPost.dataImage,
      dataTitle: newPost.dataTitle,
    },
  });
}

const PAGE_LIMIT = 20;

async function getPosts(page: number) {
  const skipPosts = (page - 1) * PAGE_LIMIT;

  return prismaClient.posts.findMany({
    skip: skipPosts,
    take: PAGE_LIMIT,
    orderBy: {
      date: "desc"
    }
  });
}

async function likePost(userId: number, post: Posts, postId: number) {
  return prismaClient.posts.update({
    where:{
      id:postId,
    },
    data:{
      likes:post.likes
    }
  })
}

async function getPostById(postId: number) {
  return prismaClient.posts.findFirst({
    where: {
      id: postId
    }
  })
}


export const postsRepository = {
  createPost,
  getPosts,
  likePost,
  getPostById
};
