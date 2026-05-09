import { test, expect } from "@playwright/test";

test.describe("CRUD operations for Category", () => {
  test("Create a new category", async ({ page }) => {
    const response = await page.request.post("/api/category", {
      data: {
        name: "Beverages",
      },
    });

    const responseBody = await response.json();
    console.log("Create Response:", responseBody);
    
    expect(response.status()).toBe(201);
  });
});
