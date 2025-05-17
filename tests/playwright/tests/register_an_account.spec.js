import { test, expect } from '@playwright/test';
import counter from '../utils/counter.js';

test('test', async ({ page }) => {
  let count = await counter();
  await page.goto('http://hexling.ru/');
  await page.getByRole('button', { name: 'Войти' }).click();
  await page.getByRole('tab', { name: 'Регистрация' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill(`testuser_3${count}`);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(`testuser_3${count}@test.ru`);
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('testpassword');
  await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('button', { name: 'user Профиль' })).toBeVisible();
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});