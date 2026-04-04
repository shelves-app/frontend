"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth";

interface FollowButtonProps {
  userId: string;
  initialIsFollowing: boolean | null;
  isPrivate: boolean;
}

export const FollowButton = ({
  userId,
  initialIsFollowing,
  isPrivate,
}: FollowButtonProps) => {
  const session = useAuthStore((s) => s.session);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!session) {
    return (
      <Button
        size="sm"
        className="bg-shelvitas-green font-semibold text-background hover:bg-shelvitas-green/90"
        onClick={() => {
          window.location.href = "/sign-in";
        }}
      >
        Follow
      </Button>
    );
  }

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const result = await api.post<{ status: string }>(
        `/v1/users/${userId}/follow`,
      );
      if (result.status === "pending") {
        setIsPending(true);
      } else {
        setIsFollowing(true);
      }
    } catch {
      // Silently handle — user may already follow
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/v1/users/${userId}/follow`);
      setIsFollowing(false);
      setIsPending(false);
    } catch {
      // Silently handle
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-xs"
        onClick={handleUnfollow}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Requested"}
      </Button>
    );
  }

  if (isFollowing) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-xs"
        onClick={handleUnfollow}
        disabled={isLoading}
      >
        {isLoading ? "..." : "Following"}
      </Button>
    );
  }

  const followLabel = isPrivate ? "Request" : "Follow";

  return (
    <Button
      size="sm"
      className="bg-shelvitas-green font-semibold text-background hover:bg-shelvitas-green/90"
      onClick={handleFollow}
      disabled={isLoading}
    >
      {isLoading ? "..." : followLabel}
    </Button>
  );
};
