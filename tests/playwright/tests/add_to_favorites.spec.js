import { test, expect } from '../fixtures/auth.fixture';

test('test', async ({ page }) => {
  console.log('Добавить в избранное и удалить из избранного');
  await page .getByRole('link', { name: 'HEXLING' }).click();
  await page .getByRole('button', { name: 'Добавить в избранное' }).first().click();
  await page .getByRole('button', { name: 'user Профиль' }).click();
  await page .getByRole('link', { name: 'Любимые отели' }).click();
  await page.waitForLoadState('networkidle');
  const button = page.getByRole('button', { name: 'Удалить из избранного' }).first();
  await button.click();
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});
