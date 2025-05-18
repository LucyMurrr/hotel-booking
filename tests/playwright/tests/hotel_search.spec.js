import { test, expect } from '../fixtures/auth.fixture';

test('Проверка поиска отелей', async ({ page }) => {
  await expect(page.locator('input[placeholder="Поиск по названию отеля"]')).toBeVisible();
  await page.locator('input[placeholder="Поиск по названию отеля"]').fill('Grand');
  await expect(page.locator('input[placeholder="Поиск по названию отеля"]')).toHaveValue('Grand');
  await expect(page.locator('.ant-input-clear-icon')).toBeVisible();
});

