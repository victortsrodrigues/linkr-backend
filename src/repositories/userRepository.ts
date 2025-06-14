import { UserProfile } from "../protocols/userProtocol";
import prismaClient from "../database/client";

async function getUserById(userId: number) {
  return await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      image: true,
      bio: true,
      age: true,
      createdAt: true,
      _count: {
        select: {
          followers: true,
          following: true
        }
      }
    }
  });
}
const PAGE_LIMIT = 10;
async function getUserPosts(userId: number, page: number) {
  const skipPosts = (page - 1) * PAGE_LIMIT;
  return await prismaClient.posts.findMany({
    where: {
      userId: userId,
    },
    skip: skipPosts,
    take: PAGE_LIMIT,
    orderBy: {
      date: 'desc'
    },
    include: {
      user: {
        select: {
          username: true,
          image: true
        }
      }
    }
  });
}

async function followUser(followerId: number, followingId: number) {
  return await prismaClient.follow.create({
    data: {
      followerId,
      followingId
    }
  });
}

async function unfollowUser(followerId: number, followingId: number) {
  return await prismaClient.follow.deleteMany({
    where: {
      followerId,
      followingId
    }
  });
}

async function getFollowStatus(followerId: number, followingId: number) {
  const isFollowing = await prismaClient.follow.findFirst({
    where: {
      followerId,
      followingId
    }
  });
  const isFollower = await prismaClient.follow.findFirst({
    where: {
      followerId: followingId,
      followingId: followerId
    }
  });
  return { isFollowing: !!isFollowing,
    isFollower: !!isFollower
   };
}

async function getFollowers(userId: number, currentUserId: number) {
  const followers = await prismaClient.follow.findMany({
    where: {
      followingId: userId
    },
    select: {
      follower: {
        select: {
          id: true,
          username: true,
          image: true
        }
      }
    }
  });

  // Check if current user follows each follower
  const followersWithStatus = await Promise.all(
    followers.map(async (follow) => {
      const isFollowing = await getFollowStatus(currentUserId, follow.follower.id);
      return {
        ...follow.follower,
        isFollowing: isFollowing.isFollowing
      };
    })
  );

  return followersWithStatus;
}

async function getFollowing(userId: number, currentUserId: number) {
  const following = await prismaClient.follow.findMany({
    where: {
      followerId: userId
    },
    select: {
      following: {
        select: {
          id: true,
          username: true,
          image: true
        }
      }
    }
  });

  // Check if current user follows each following
  const followingWithStatus = await Promise.all(
    following.map(async (follow) => {
      const isFollowing = await getFollowStatus(currentUserId, follow.following.id);
      return {
        ...follow.following,
        isFollowing: isFollowing.isFollowing
      };
    })
  );

  return followingWithStatus;
}

async function updateMyProfile(userId: number, profile:UserProfile) {
    const updatedProfile = await prismaClient.user.update({
        where: {
            id: userId,
        },
        data: {
          age: profile.age,
          bio: profile.bio,
          username: profile.username,
          image: profile.image
        }
    })
    return updatedProfile
}

const userRepository = {
  getUserById,
  getUserPosts,
  followUser,
  unfollowUser,
  getFollowStatus,
  getFollowers,
  getFollowing,
  updateMyProfile
};

export default userRepository;
