import { describe, it, expect, vi, beforeEach } from "vitest";

import { useAuthStore } from "@/store/auth";

// Mock supabase client
const mockGetSession = vi.fn();
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: mockGetSession,
    },
  }),
}));

// Mock fetch for API calls
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Track window.location.href assignments
let locationHref = "";

beforeEach(() => {
  vi.clearAllMocks();
  locationHref = "";
  Object.defineProperty(window, "location", {
    writable: true,
    value: { href: "", origin: "http://localhost:3000" },
  });
  // Intercept href assignments
  Object.defineProperty(window.location, "href", {
    set: (val: string) => {
      locationHref = val;
    },
    get: () => locationHref,
  });
  useAuthStore.setState({
    user: null,
    session: null,
    profile: null,
    isLoading: true,
  });
});

// Helper to simulate what the callback page does
async function simulateCallback() {
  const { createClient } = await import("@/lib/supabase/client");
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    window.location.href = "/sign-in?error=auth_callback_failed";
    return;
  }

  useAuthStore.getState().setAuth(session.user, session);

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${API_URL}/v1/auth/me`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    if (res.ok) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/complete-profile";
    }
  } catch {
    window.location.href = "/complete-profile";
  }
}

describe("Auth Callback", () => {
  it("should redirect to /profile when user has existing profile", async () => {
    const mockSession = {
      access_token: "valid-token",
      user: { id: "user-123", email: "test@example.com" },
    };

    mockGetSession.mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          data: { id: "profile-123", username: "testuser" },
        }),
    });

    await simulateCallback();

    expect(locationHref).toBe("/profile");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/v1/auth/me"),
      expect.objectContaining({
        headers: { Authorization: "Bearer valid-token" },
      }),
    );
  });

  it("should redirect to /complete-profile when user has no profile", async () => {
    const mockSession = {
      access_token: "valid-token",
      user: { id: "user-456", email: "new@example.com" },
    };

    mockGetSession.mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () =>
        Promise.resolve({
          error: { message: "Profile not found" },
        }),
    });

    await simulateCallback();

    expect(locationHref).toBe("/complete-profile");
  });

  it("should redirect to /complete-profile when API call fails", async () => {
    const mockSession = {
      access_token: "valid-token",
      user: { id: "user-789", email: "test@example.com" },
    };

    mockGetSession.mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });

    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await simulateCallback();

    expect(locationHref).toBe("/complete-profile");
  });

  it("should redirect to /sign-in when session is null", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: null },
      error: null,
    });

    await simulateCallback();

    expect(locationHref).toBe("/sign-in?error=auth_callback_failed");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should redirect to /sign-in when getSession returns an error", async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: null },
      error: new Error("Auth error"),
    });

    await simulateCallback();

    expect(locationHref).toBe("/sign-in?error=auth_callback_failed");
  });

  it("should store session in zustand before checking profile", async () => {
    const mockSession = {
      access_token: "valid-token",
      user: { id: "user-123", email: "test@example.com" },
    };

    mockGetSession.mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: { id: "p1" } }),
    });

    await simulateCallback();

    // Session should have been set in store
    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockSession.user);
    expect(state.session).toEqual(mockSession);
  });
});
