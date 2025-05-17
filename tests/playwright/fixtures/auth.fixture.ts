import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = process.env.TEST_USER_FOR;
    const password = process.env.TEST_PASSWORD_FOR;
    if (!email || !password) {
      throw new Error('TEST_USER_FOR и TEST_PASSWORD_FOR должны быть заданы');
    }
    await page.goto('http://hexling.ru/');
    await page.waitForLoadState('networkidle');
    await page.locator('header > div > div > button.ant-btn').click();
    await page.waitForLoadState('networkidle');
    await page.locator('input[placeholder="Email"]').fill(email);
    await page.locator('input[placeholder="Пароль"]').fill(password);
    await page.locator('form').getByRole('button', { name: 'Войти' }).click();
    await context.storageState({ path: 'auth-state.json' });
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';