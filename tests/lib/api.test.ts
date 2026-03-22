import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the supabase client
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({
        data: { session: null },
      }),
    },
  }),
}));

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

// Import after mocks are set up
const { api } = await import("@/lib/api");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("api client", () => {
  describe("get", () => {
    it("should make GET request and return data", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: { id: "123", name: "Test" } }),
      });

      const result = await api.get("/v1/test");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/v1/test",
        expect.objectContaining({ headers: expect.any(Object) }),
      );
      expect(result).toEqual({ id: "123", name: "Test" });
    });

    it("should throw on non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () =>
          Promise.resolve({
            error: { message: "Not found" },
          }),
      });

      await expect(api.get("/v1/missing")).rejects.toThrow("Not found");
    });
  });

  describe("post", () => {
    it("should make POST request with body", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve({ data: { id: "456" } }),
      });

      const result = await api.post("/v1/test", { name: "New" });

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/v1/test",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ name: "New" }),
        }),
      );
      expect(result).toEqual({ id: "456" });
    });
  });

  describe("delete", () => {
    it("should handle 204 no content", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await api.delete("/v1/test/123");

      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/v1/test/123",
        expect.objectContaining({ method: "DELETE" }),
      );
      expect(result).toBeUndefined();
    });
  });

  describe("auth headers", () => {
    it("should not include auth header when no session", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: {} }),
      });

      await api.get("/v1/test");

      const [, options] = mockFetch.mock.calls[0];
      expect(options.headers.Authorization).toBeUndefined();
    });
  });
});
