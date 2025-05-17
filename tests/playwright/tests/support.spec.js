import { test, expect } from '../fixtures/auth.fixture';
import counter from '../utils/counter';

test('test', async ({ page }) => {
  let count = await counter();
  await page.getByRole('button', { name: 'message' }).click();
  await page.getByRole('textbox', { name: 'Введите сообщение' }).click();
  await page.getByRole('textbox', { name: 'Введите сообщение' }).fill(`test message${count}`);
  await page.getByRole('button', { name: 'send' }).click();
  await expect(page.getByText(`test message${count}`)).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});