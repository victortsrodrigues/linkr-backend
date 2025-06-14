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
  let page = Number(req.query.page) || 1;
  if (page < 0 || !(page % 2 === 0 || page % 2 === 1)) page = 1;
  const userId = parseInt(req.params.id);
  const posts = await userServices.getUserPosts(userId, page);
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

async function updateMyProfile(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const editedProfile = req.body;
  const updatedProfile = await userServices.updateMyProfile(userId, editedProfile);
  res.status(200).send(updatedProfile);
}

async function usersForSearch(req: Request, res: Response) {
  const user = res.locals.user;
  const allUsers = await userServices.usersForSearch(Number(user.id))
  res.status(200).send(allUsers);
}

const userController = {
  getUserProfile,
  getMyProfile,
  getUserPosts,
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
  updateMyProfile,
  usersForSearch
};

export default userController;
