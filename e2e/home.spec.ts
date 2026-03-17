import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the homepage title", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Frontend Starter Kit" }),
    ).toBeVisible();
  });

  test("should have navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Login" }).click();
    await expect(
      page.getByRole("heading", { name: "Login" }),
    ).toBeVisible();
  });
});
