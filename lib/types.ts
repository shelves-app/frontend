export interface FavouriteBook {
  id: string;
  title: string;
  coverUrl: string | null;
}

export interface PublicProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  websiteUrl: string | null;
  location: string | null;
  profileVisibility: "public" | "private";
  isVerified: boolean;
  createdAt: string;

  followerCount: number;
  followingCount: number;
  booksReadCount: number;

  favouriteBooks: FavouriteBook[];

  isFollowing: boolean | null;
  isOwnProfile: boolean;
}

export interface LimitedProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  profileVisibility: "private";
  isVerified: boolean;

  followerCount: number;
  followingCount: number;

  isFollowing: boolean | null;
  isOwnProfile: false;
}

export type ProfileData = PublicProfile | LimitedProfile;

export function isFullProfile(profile: ProfileData): profile is PublicProfile {
  return "bio" in profile;
}
