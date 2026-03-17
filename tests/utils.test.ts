import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    const result = cn("px-2 py-1", "p-3");
    expect(result).toBe("p-3");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "extra");
    expect(result).toBe("base extra");
  });

  it("handles empty inputs", () => {
    const result = cn();
    expect(result).toBe("");
  });
});
