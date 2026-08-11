import * as fs from 'fs';
import * as path from 'path';

interface LoginTestCase {
  testCaseId: string;
  username: string;
  password: string;
  expectedResult: string;
  expectedMessage: string;
}

function splitCsvRow(row: string, numFields: number): string[] {
  // Split on commas but keep the last field intact (it may contain commas)
  const parts = row.split(',');
  const result = parts.slice(0, numFields - 1).map(p => p.trim());
  result.push(parts.slice(numFields - 1).join(',').trim());
  return result;
}

function parseLoginCsv(filePath: string): LoginTestCase[] {
  const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
  const [header, ...rows] = lines;
  const keys = header.split(',').map(k => k.trim());
  return rows.map(row => {
    const values = splitCsvRow(row, keys.length);
    return keys.reduce((obj: Record<string, string>, key, i) => {
      obj[key] = values[i] ?? '';
      return obj;
    }, {}) as unknown as LoginTestCase;
  });
}

// ── Read CSV ──────────────────────────────────────────────────────────────────

const csvPath = path.join(__dirname, '../test-data/login.csv');
const testCases = parseLoginCsv(csvPath);

// ── Generate feature file ─────────────────────────────────────────────────────

const featureLines: string[] = [
  'Feature: Login Scenarios',
  '  As a user I want to log in to the application',
  '',
];

for (const tc of testCases) {
  const label = tc.expectedResult === 'Pass' ? 'Successful login' : 'Failed login';
  featureLines.push(`  Scenario: [${tc.testCaseId}] ${label} - ${tc.expectedMessage}`);
  featureLines.push(`    Given I navigate to the login page`);
  featureLines.push(`    When I enter username "${tc.username}" and password "${tc.password}"`);
  featureLines.push(`    And I click the login button`);
  featureLines.push(`    Then the login result should be "${tc.expectedResult}" and message "${tc.expectedMessage}"`);
  featureLines.push('');
}

const featuresDir = path.join(__dirname, '../features');
if (!fs.existsSync(featuresDir)) fs.mkdirSync(featuresDir, { recursive: true });

const featurePath = path.join(featuresDir, 'login.feature');
fs.writeFileSync(featurePath, featureLines.join('\n'), 'utf-8');
console.log(`✔ Generated ${featurePath} with ${testCases.length} scenarios`);

// ── Generate step definitions ─────────────────────────────────────────────────

const stepsContent = `import { createBdd } from 'playwright-bdd';
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
    await expect(page).toHaveURL(\`\${BASE_URL}/inventory.html\`);
  } else {
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText(expectedMessage);
  }
});
`;

const stepsDir = path.join(__dirname, '../step-definitions');
if (!fs.existsSync(stepsDir)) fs.mkdirSync(stepsDir, { recursive: true });

const stepsPath = path.join(stepsDir, 'login.steps.ts');
fs.writeFileSync(stepsPath, stepsContent, 'utf-8');
console.log(`✔ Generated ${stepsPath}`);
