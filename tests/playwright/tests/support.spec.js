import { test, expect } from '../fixtures/auth.fixture';

test('test', async ({ page }) => {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  console.log(uniqueId);
  await page.getByRole('button', { name: 'message' }).click();
  await page.getByRole('textbox', { name: 'Введите сообщение' }).click();
  await page.getByRole('textbox', { name: 'Введите сообщение' }).fill(`test message${uniqueId}`);
  await page.getByRole('button', { name: 'send' }).click();
  console.log(`Сообщение отправлено test message${uniqueId}`);
  await expect(page.getByText(`test message${uniqueId}`)).toBeVisible({ timeout: 10_000 });
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});