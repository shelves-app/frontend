import { test, expect } from "@playwright/test";

test.describe("Public Profile Page", () => {
  test("should show 404 for non-existent username", async ({ page }) => {
    await page.goto("/nonexistentuser99999");

    // Should show the not-found page
    await expect(page.getByText(/not found/i)).toBeVisible({ timeout: 10000 });
  });

  test("should load the profile route without crashing", async ({ page }) => {
    // Even if the API is down, the page should render without JS errors
    const response = await page.goto("/testuser");

    // Should get either a valid page or 404 — not a 500
    expect(response?.status()).not.toBe(500);
  });
});
