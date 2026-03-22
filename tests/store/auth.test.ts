import { describe, it, expect, beforeEach } from "vitest";

import { useAuthStore } from "@/store/auth";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      session: null,
      profile: null,
      isLoading: true,
    });
  });

  it("has correct initial state", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.profile).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it("sets auth user and session", () => {
    const mockUser = { id: "123", email: "test@example.com" } as never;
    const mockSession = {
      access_token: "token",
      user: mockUser,
    } as never;

    useAuthStore.getState().setAuth(mockUser, mockSession);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.session).toEqual(mockSession);
  });

  it("sets profile", () => {
    const mockProfile = {
      id: "456",
      email: "test@example.com",
      username: "testuser",
      displayName: "Test User",
      bio: null,
      avatarUrl: null,
      profileVisibility: "public" as const,
    };

    useAuthStore.getState().setProfile(mockProfile);

    expect(useAuthStore.getState().profile).toEqual(mockProfile);
  });

  it("sets loading state", () => {
    useAuthStore.getState().setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);

    useAuthStore.getState().setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);
  });

  it("clears all auth state", () => {
    const mockUser = { id: "123" } as never;
    const mockSession = { access_token: "token" } as never;
    const mockProfile = {
      id: "456",
      email: "test@example.com",
      username: "testuser",
      displayName: "Test",
      bio: null,
      avatarUrl: null,
      profileVisibility: "public" as const,
    };

    useAuthStore.getState().setAuth(mockUser, mockSession);
    useAuthStore.getState().setProfile(mockProfile);

    useAuthStore.getState().clear();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.profile).toBeNull();
  });

  it("sets profile to null", () => {
    const mockProfile = {
      id: "456",
      email: "test@example.com",
      username: "testuser",
      displayName: "Test",
      bio: null,
      avatarUrl: null,
      profileVisibility: "public" as const,
    };

    useAuthStore.getState().setProfile(mockProfile);
    expect(useAuthStore.getState().profile).not.toBeNull();

    useAuthStore.getState().setProfile(null);
    expect(useAuthStore.getState().profile).toBeNull();
  });
});
