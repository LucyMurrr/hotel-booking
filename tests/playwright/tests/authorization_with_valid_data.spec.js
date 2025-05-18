import { test, expect } from '@playwright/test';

import parser from '../utils/parser.js';

const useEnv = Boolean(process.env.TEST_USER_FOR && process.env.TEST_PASSWORD_FOR && process.env.URL_FOR);
let testData;

if (useEnv) {
  testData = {
    page: process.env.URL_FOR,
    user: {
      email: process.env.TEST_USER_FOR,
      valid_password: process.env.TEST_PASSWORD_FOR,
      invalid_password: '12344214',
    },
  };
} else {
  testData = parser('./utils/auth/user.json');
}

test('test', async ({ page }) => {
  // Переход на страницу
  await page.goto(testData.page);

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
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});
