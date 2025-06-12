import { notFoundError } from "../errors/notFoundError";
import { UserFollow, UserProfile } from "../protocols/userProtocol";
import userRepository from "../repositories/userRepository";
import { conflictError } from "../errors/conflictError";

async function getUserProfile(userId: number): Promise<UserProfile> {
  const user = await userRepository.getUserById(userId);
  if (!user) throw notFoundError("User");
  
  return {
    id: user.id,
    username: user.username,
    image: user.image,
    bio: user.bio,
    age: user.age,
    createdAt: user.createdAt,
    followersCount: user._count.followers,
    followingCount: user._count.following
  };
}

async function getUserPosts(userId: number) {
  const user = await userRepository.getUserById(userId);
  if (!user) throw notFoundError("User");

  return await userRepository.getUserPosts(userId);
}

async function followUser(followerId: number, followingId: number) {
  const user = await userRepository.getUserById(followingId);
  if (!user) throw notFoundError("User");

  // Verificar se já está seguindo
  const followStatus = await userRepository.getFollowStatus(followerId, followingId);
  if (followStatus.isFollowing) throw conflictError("Already following");

  // Não permitir seguir a si mesmo
  if (followerId === followingId) throw conflictError("Cannot follow yourself");

  await userRepository.followUser(followerId, followingId);
  return { success: true };
}

async function unfollowUser(followerId: number, followingId: number) {
  const user = await userRepository.getUserById(followingId);
  if (!user) throw notFoundError("User");

  // Verificar se está seguindo
  const followStatus = await userRepository.getFollowStatus(followerId, followingId);
  if (!followStatus.isFollowing) throw notFoundError("Follow relationship");

  await userRepository.unfollowUser(followerId, followingId);
  return { success: true };
}

async function getFollowStatus(followerId: number, followingId: number) {
  const user = await userRepository.getUserById(followingId);
  if (!user) throw notFoundError("User");

  return await userRepository.getFollowStatus(followerId, followingId);
}

async function getFollowers(userId: number, currentUserId: number): Promise<UserFollow[]> {
  const user = await userRepository.getUserById(userId);
  if (!user) throw notFoundError("User");

  return await userRepository.getFollowers(userId, currentUserId);
}

async function getFollowing(userId: number, currentUserId: number): Promise<UserFollow[]> {
  const user = await userRepository.getUserById(userId);
  if (!user) throw notFoundError("User");

  return await userRepository.getFollowing(userId, currentUserId);
}

async function updateMyProfile(userId: number, profile:UserProfile) {
  profile.age = Number(profile.age)

  const updatedProfile = await userRepository.updateMyProfile(userId, profile);
  
  return updatedProfile
}

const userServices = {
  getUserProfile,
  getUserPosts,
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
  updateMyProfile
};

export default userServices;
