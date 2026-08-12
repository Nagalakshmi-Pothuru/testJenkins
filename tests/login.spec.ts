import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const URL = 'https://www.saucedemo.com';

interface LoginTestCase {
  testCaseId: string;
  username: string;
  password: string;
  expectedResult: string;
  expectedMessage: string;
}

function parseLoginCsv(filePath: string): LoginTestCase[] {
  const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
  const [header, ...rows] = lines;
  const keys = header.split(',').map((key) => key.trim()) as (keyof LoginTestCase)[];
  return rows.map((row: string) => {
    const values = row.split(',');
    const expectedMessageIndex = keys.indexOf('expectedMessage');
    const message = values.slice(expectedMessageIndex).join(',').trim();

    return keys.reduce((obj, key, i) => {
      obj[key] = key === 'expectedMessage' ? message : (values[i] ?? '').trim();
      return obj;
    }, {} as LoginTestCase);
  });
}

const testCases = parseLoginCsv(path.join(__dirname, '../test-data/login.csv'));

test.describe('Login scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  for (const tc of testCases) {
    test(`[${tc.testCaseId}] ${tc.expectedResult === 'Pass' ? 'successful login' : 'login fails'} - ${tc.expectedMessage}`, async ({ page }) => {
      if (tc.username) {
        await page.locator('[data-test="username"]').fill(tc.username);
      }
      if (tc.password) {
        await page.locator('[data-test="password"]').fill(tc.password);
      }

      await page.locator('[data-test="login-button"]').click();

      if (tc.expectedResult === 'Pass') {
        await expect(page).toHaveURL(`${URL}/inventory.html`);
      } else {
        // Error container on SauceDemo wraps the message with a prefix
        const errorLocator = page.locator('[data-test="error"]');
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toContainText(tc.expectedMessage);
      }
    });
  }
});
