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
  if (!img)
    img = "https://photos1.blogger.com/blogger/1325/1192/1600/corbranco.0.jpg";
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

export const postsService = {
  createNewPost,
  getAllPosts,
};
