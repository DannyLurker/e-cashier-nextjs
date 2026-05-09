import { test, expect } from "@playwright/test";

test.describe("CRUD operations for Category", () => {
  test.describe.configure({ mode: "serial" });

  const TEST_PREFIX = "TEST_9876544";
  let createdCategoryId: string;

  test("Create a new category", async ({ request }) => {
    const response = await request.post("/api/category", {
      data: { name: `${TEST_PREFIX}Book` },
    });
    const body = await response.json();
    console.log("Create Response:", body);

    expect(response.status()).toBe(201);
    createdCategoryId = body.id;
  });

  test("Get list of categories", async ({ request }) => {
    const response = await request.get(
      "/api/category?sortOrder=asc&sortBy=name&page=1&dataPerPage=10",
    );
    const body = await response.json();
    console.log("Get List Response:", body);

    expect(response.status()).toBe(200);
    expect(body.categories).toBeDefined();
    expect(Array.isArray(body.categories)).toBe(true);
  });

  test("Get single category by ID", async ({ request }) => {
    console.log("createdCategoryId: ", createdCategoryId);
    const response = await request.get(`/api/category/${createdCategoryId}`);
    const body = await response.json();
    console.log("Get Single Response:", body);

    expect(response.status()).toBe(200);
    expect(body.category).toBeDefined();
    expect(body.category.id).toBe(createdCategoryId);
  });

  test("Update a category", async ({ request }) => {
    const response = await request.patch(`/api/category/`, {
      data: { id: createdCategoryId, name: `${TEST_PREFIX}BookUpdated` },
    });
    const body = await response.json();
    console.log("Update Response:", body);

    expect(response.status()).toBe(200);
  });

  test("Delete a category", async ({ request }) => {
    const response = await request.delete(`/api/category/${createdCategoryId}`);
    const body = await response.json();
    console.log("Delete Response:", body);

    expect(response.status()).toBe(200);
  });

  test("Error: Create category with short name", async ({ request }) => {
    const response = await request.post("/api/category", {
      data: { name: "Bo" },
    });
    const body = await response.json();
    console.log("Short Name Error Response:", body);

    expect(response.status()).toBe(400);
  });

  test("Error: Create duplicate category name", async ({ request }) => {
    // Create first
    await request.post("/api/category", {
      data: { name: `${TEST_PREFIX}Duplicate` },
    });

    // Create duplicate
    const response = await request.post("/api/category", {
      data: { name: `${TEST_PREFIX}Duplicate` },
    });
    const body = await response.json();
    console.log("Duplicate Error Response:", body);

    expect(response.status()).toBe(409);
    expect(body.message.toLowerCase()).toContain("name");
  });

  test("Error: Update non-existent category", async ({ request }) => {
    const response = await request.patch("/api/category", {
      data: { name: "Updated Name", id: "non-existent-id-12345" },
    });
    const body = await response.json();
    console.log("Non-existent Update Error Response:", body);

    expect(response.status()).toBe(404);
  });

  test("Error: Delete non-existent category", async ({ request }) => {
    const response = await request.delete(
      "/api/category/non-existent-id-12345",
    );
    const body = await response.json();
    console.log("Non-existent Delete Error Response:", body);

    expect(response.status()).toBe(404);
  });

  // Cleanup leftover test data (duplicate test creates data that isn't deleted)
  test("Cleanup: Delete leftover test data", async ({ browser }) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/manager.json",
    });
    const request = context.request;

    const list = await request.get(
      "http://localhost:3000/api/category?page=1&dataPerPage=100",
    );
    const { categories } = await list.json();

    for (const category of categories) {
      if (category.name.startsWith(TEST_PREFIX)) {
        await request.delete(
          `http://localhost:3000/api/category/${category.id}`,
        );
      }
    }

    await context.close();
  });
});
