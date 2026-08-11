import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

const BASE_URL = 'https://www.saucedemo.com';

Given('I navigate to the login page', async ({ page }) => {
  await page.goto(BASE_URL);
});

When('I enter username {string} and password {string}', async ({ page }, username: string, password: string) => {
  if (username) {
    await page.locator('[data-test="username"]').fill(username);
  }
  if (password) {
    await page.locator('[data-test="password"]').fill(password);
  }
});

When('I click the login button', async ({ page }) => {
  await page.locator('[data-test="login-button"]').click();
});

Then('the login result should be {string} and message {string}', async ({ page }, expectedResult: string, expectedMessage: string) => {
  if (expectedResult === 'Pass') {
    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
  } else {
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText(expectedMessage);
  }
});
