import authRepository from "../repositories/authRepository";
import { Posts } from "../protocols/postProtocol";
import { postsRepository } from "../repositories/postsRepository";
import urlMetadata from "url-metadata";
import { notFoundError } from "../errors/notFoundError";
import { unauthorizedError } from "../errors/unauthorizedError";

async function createNewPost(userId: number, newPost: Posts) {
  const metaDataComplete = await urlMetadata(newPost.url);
  let img =
    metaDataComplete["og.image"] ??
    metaDataComplete["twitter:image"] ??
    metaDataComplete.image ??
    metaDataComplete["busca:image"] ??
    null;

  newPost = {
    ...newPost,
    dataTitle: metaDataComplete.title,
    dataDescription: metaDataComplete.description,
    dataImage: img,
  };
  const post = postsRepository.createPost(userId, newPost);
  return post;
}

async function getAllPosts(page: number) {
  const allPosts = await postsRepository.getPosts(page);

  const allPostsWithUser = await Promise.all(
    allPosts.map( async post => {
      const user = await authRepository.findById(post.userId)

      const usersLike = await usersLikes(post.likes)

      return {
        ...post,
        likes: usersLike,
        userName: user.username,
        userImage: user.image
      }
    })
  )
  return allPostsWithUser
}

  async function usersLikes(idLikes:number[]) {
    return Promise.all(
      idLikes.map(async (userLikeId) => {
        const infoUser = await authRepository.findById(userLikeId);
        if (!infoUser) return null;

        const userName = infoUser.username
        return { name: userName, id: userLikeId };
        })
    )
  }


async function likePosts(userId: number, postId: number) {
  const post = await postsRepository.getPostById(postId)
  const alReadyLiked = post.likes.includes(userId)

  if(!alReadyLiked){
    post.likes.push(userId)
  } else {
    post.likes = post.likes.filter(user => user != userId)
  }

  return await postsRepository.likePost(post,postId);
}

async function updatePost(postId: number, userId: number, data: { description: string, url: string }) {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError("Post");
  if (post.userId !== userId) throw unauthorizedError("You can't edit this post!");

  const metaDataComplete = await urlMetadata(data.url);
  let img =
    metaDataComplete["og.image"] ??
    metaDataComplete["twitter:image"] ??
    metaDataComplete.image ??
    metaDataComplete["busca:image"] ??
    null;

  const updatedPost = await postsRepository.updatePost(postId, {
    description: data.description,
    url: data.url,
    dataDescription: metaDataComplete.description,
    dataImage: img,
    dataTitle: metaDataComplete.title
  });

  return updatedPost;
}

async function deletePost(postId: number, userId: number) {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError("Post");
  if (post.userId !== userId) throw unauthorizedError("You can't delete this post!");

  await postsRepository.deletePost(postId);
}

export const postsService = {
  createNewPost,
  getAllPosts,
  likePosts,
  updatePost,
  deletePost,
  usersLikes
};
