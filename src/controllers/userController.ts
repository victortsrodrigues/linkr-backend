import { Request, Response } from "express";
import userServices from "../services/userServices";

async function getUserProfile(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const profile = await userServices.getUserProfile(userId);
  res.status(200).send(profile);
}

async function getMyProfile(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const profile = await userServices.getUserProfile(userId);
  res.status(200).send(profile);
}

async function getUserPosts(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const posts = await userServices.getUserPosts(userId);
  res.status(200).send(posts);
}

async function followUser(req: Request, res: Response) {
  const followingId = parseInt(req.params.id);
  const followerId = res.locals.user.id;
  
  await userServices.followUser(followerId, followingId);
  res.status(200).send({ success: true });
}

async function unfollowUser(req: Request, res: Response) {
  const followingId = parseInt(req.params.id);
  const followerId = res.locals.user.id;
  
  await userServices.unfollowUser(followerId, followingId);
  res.status(200).send({ success: true });
}

async function getFollowStatus(req: Request, res: Response) {
  const followingId = parseInt(req.params.id);
  const followerId = res.locals.user.id;
  
  const status = await userServices.getFollowStatus(followerId, followingId);
  res.status(200).send(status);
}

async function getFollowers(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const currentUserId = res.locals.user.id;
  
  const followers = await userServices.getFollowers(userId, currentUserId);
  res.status(200).send(followers);
}

async function getFollowing(req: Request, res: Response) {
  const userId = parseInt(req.params.id);
  const currentUserId = res.locals.user.id;
  
  const following = await userServices.getFollowing(userId, currentUserId);
  res.status(200).send(following);
}

const userController = {
  getUserProfile,
  getMyProfile,
  getUserPosts,
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing
};

export default userController;
