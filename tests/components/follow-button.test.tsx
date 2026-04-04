import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useAuthStore } from "@/store/auth";

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Mock supabase client
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    },
  }),
}));

// Import after mocks
const { FollowButton } = await import("@/components/profile/follow-button");

beforeEach(() => {
  vi.clearAllMocks();
  useAuthStore.setState({
    user: null,
    session: null,
    profile: null,
    isLoading: false,
  });
});

describe("FollowButton", () => {
  it("should show Follow button when not authenticated", () => {
    render(
      <FollowButton
        userId="user-1"
        initialIsFollowing={null}
        isPrivate={false}
      />,
    );

    expect(screen.getByRole("button", { name: "Follow" })).toBeInTheDocument();
  });

  it("should show Request button for private profiles when authenticated", () => {
    useAuthStore.setState({
      session: { access_token: "token" } as never,
    });

    render(
      <FollowButton userId="user-1" initialIsFollowing={false} isPrivate />,
    );

    expect(screen.getByRole("button", { name: "Request" })).toBeInTheDocument();
  });

  it("should show Following when already following", () => {
    useAuthStore.setState({
      session: { access_token: "token" } as never,
    });

    render(
      <FollowButton userId="user-1" initialIsFollowing isPrivate={false} />,
    );

    expect(
      screen.getByRole("button", { name: "Following" }),
    ).toBeInTheDocument();
  });

  it("should call API on follow click", async () => {
    useAuthStore.setState({
      session: { access_token: "token" } as never,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: () =>
        Promise.resolve({
          data: { id: "f1", status: "active" },
        }),
    });

    render(
      <FollowButton
        userId="user-1"
        initialIsFollowing={false}
        isPrivate={false}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Follow" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Following" }),
      ).toBeInTheDocument();
    });
  });

  it("should show Requested after following a private profile", async () => {
    useAuthStore.setState({
      session: { access_token: "token" } as never,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: () =>
        Promise.resolve({
          data: { id: "f1", status: "pending" },
        }),
    });

    render(
      <FollowButton userId="user-1" initialIsFollowing={false} isPrivate />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Request" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Requested" }),
      ).toBeInTheDocument();
    });
  });

  it("should unfollow on Following click", async () => {
    useAuthStore.setState({
      session: { access_token: "token" } as never,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
    });

    render(
      <FollowButton userId="user-1" initialIsFollowing isPrivate={false} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Following" }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Follow" }),
      ).toBeInTheDocument();
    });
  });
});
