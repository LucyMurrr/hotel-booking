import { test as base } from '@playwright/test';
import parser from '../utils/parser.js';

const testData = parser('./utils/auth/user.json');

export const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(testData.page);
    console.log(testData.page);
    await page.waitForLoadState('networkidle');
    await page.locator('header > div > div > button.ant-btn').click();
    await page.waitForLoadState('networkidle');
    await page.locator('input[placeholder="Email"]').fill(testData.user.email);
    await page.locator('input[placeholder="Пароль"]').fill(testData.user.valid_password);
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();
    await context.storageState({ path: 'auth-state.json' });
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';