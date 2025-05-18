import { test, expect } from '@playwright/test';

import parser from '../utils/parser.js';

const useEnv = Boolean(process.env.TEST_USER_FOR && process.env.TEST_PASSWORD_FOR);
let testData;

if (useEnv) {
  testData = {
    user: {
      email: process.env.TEST_USER_FOR,
      valid_password: process.env.TEST_PASSWORD_FOR,
    },
  };
} else {
  testData = parser('./utils/auth/user.json');
}

test('test', async ({ page }) => {
  // Переход на страницу
  await page.goto('http://hexling.ru/');

  // Ожидание загрузки основных ресурсов страницы
  await page.waitForLoadState('networkidle');

  // Нажать кноку "Вход"
  await page.getByRole('button', { name: 'Войти' }).click();

  //Заполнение полей email и пароль
  await page.locator('input[placeholder="Email"]').fill(testData.user.email);
  await page.locator('input[placeholder="Пароль"]').fill(testData.user.valid_password);

  //Вход
  await page.locator('form').getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByRole('button', { name: 'user Профиль' })).toBeVisible();
});
