import { describe, it, expect } from "vitest";

import { isFullProfile } from "@/lib/types";
import type { PublicProfile, LimitedProfile } from "@/lib/types";

describe("isFullProfile", () => {
  it("should return true for full public profile", () => {
    const profile: PublicProfile = {
      id: "1",
      username: "testuser",
      displayName: "Test User",
      bio: "Hello",
      avatarUrl: null,
      websiteUrl: null,
      location: null,
      profileVisibility: "public",
      isVerified: false,
      createdAt: "2024-01-01",
      followerCount: 10,
      followingCount: 5,
      booksReadCount: 20,
      favouriteBooks: [],
      isFollowing: null,
      isOwnProfile: false,
    };

    expect(isFullProfile(profile)).toBe(true);
  });

  it("should return false for limited profile", () => {
    const profile: LimitedProfile = {
      id: "2",
      username: "privateuser",
      displayName: "Private User",
      avatarUrl: null,
      profileVisibility: "private",
      isVerified: false,
      followerCount: 10,
      followingCount: 5,
      isFollowing: false,
      isOwnProfile: false,
    };

    expect(isFullProfile(profile)).toBe(false);
  });
});
