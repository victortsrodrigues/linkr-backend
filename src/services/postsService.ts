import authRepository from "../repositories/authRepository";
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

  async function usersLikes(idLikes:number[]) {
    return idLikes.map( async userLikeId => {
      const infoUser = await authRepository.findById(userLikeId)
      const userName = infoUser.username.split(' ')

      return {name: userName[0], id:userLikeId}
    })
   }


  return allPostsWithUser;
}

async function likePosts(userId: number, postId: number) {
  const post = await postsRepository.getPostById(postId)
  const alReadyLiked = post.likes.includes(userId)

  if(!alReadyLiked){
    post.likes.push(userId)
  } else {
    post.likes = post.likes.filter(user => user != userId)
  }
  console.log()

  return await postsRepository.likePost(userId,post,postId);
}

export const postsService = {
  createNewPost,
  getAllPosts,
  likePosts
};
