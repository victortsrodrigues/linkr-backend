import { Posts } from "../protocols/postProtocol";
import { postsRepository } from "../repositories/postsRepository";
import urlMetadata from "url-metadata";

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
  const allposts = await postsRepository.getPosts(page);

  return allposts;
}

async function likePosts(userId: number, postId: number) {
  const post = await postsRepository.getPostById(postId)
  const alReadyLiked = post.likes.includes(userId)

  if(!alReadyLiked){
    post.likes.push(userId)
  } else {
    post.likes = post.likes.filter(user => user != userId)
  }

  return postsRepository.likePost(userId,post,postId);
}

export const postsService = {
  createNewPost,
  getAllPosts,
  likePosts
};
