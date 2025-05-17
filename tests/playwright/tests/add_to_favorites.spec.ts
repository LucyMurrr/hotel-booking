import { test, expect } from '../fixtures/auth.fixture';

test('test', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Тест только для Chrome');
  await page .getByRole('link', { name: 'HEXLING' }).click();
  await page .getByRole('button', { name: 'Добавить в избранное' }).first().click();
  await page .getByRole('button', { name: 'user Профиль' }).click();
  await page .getByRole('link', { name: 'Любимые отели' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('div.ant-flex css-1dvur0k ant-flex-align-start').first()).toBeVisible();
  const button = page.getByRole('button', { name: 'Удалить из избранного' });
  await button.waitFor({ state: 'visible' });
  await button.click();
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});