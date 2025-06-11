export type UserProfile = {
  id: number;
  username: string;
  image: string;
  bio: string | null;
  age: number | null;
  createdAt: Date;
  followersCount: number;
  followingCount: number;
};

export type FollowStatus = {
  isFollowing: boolean;
};

export type UserFollow = {
  id: number;
  username: string;
  image: string;
  isFollowing?: boolean;
};
