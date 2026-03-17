import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "@/store";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.setState({ sidebarOpen: false });
  });

  it("has correct initial state", () => {
    const state = useAppStore.getState();
    expect(state.sidebarOpen).toBe(false);
  });

  it("toggles sidebar", () => {
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);

    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it("sets sidebar open state", () => {
    useAppStore.getState().setSidebarOpen(true);
    expect(useAppStore.getState().sidebarOpen).toBe(true);
  });
});
