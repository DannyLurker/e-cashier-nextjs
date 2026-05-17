# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> Manager authenticate
- Location: tests\auth.setup.ts:4:6

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/sign-in
Call log:
  - navigating to "http://localhost:3000/sign-in", waiting until "load"

```

# Test source

```ts
  1  | import { test as setup } from "@playwright/test";
  2  | import { MANAGER_STATE } from "./auth.constants";
  3  | 
  4  | setup("Manager authenticate", async ({ page }) => {
> 5  |   await page.goto("http://localhost:3000/sign-in"); // adjust to your actual route
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/sign-in
  6  | 
  7  |   await page.locator('input[name="email"]').fill("manager@ecashier.com");
  8  |   await page.locator('input[name="password"]').fill("manager123");
  9  |   await page.locator('button[type="submit"]').click();
  10 | 
  11 |   // Wait for redirect after successful login
  12 |   await page.waitForURL((url) => !url.pathname.includes("sign-in"), {
  13 |     timeout: 10000,
  14 |   });
  15 | 
  16 |   await page.context().storageState({ path: MANAGER_STATE });
  17 | });
  18 | 
```