import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Переход на страницу
  await page.goto('http://hexling.ru/');
  const email = process.env.TEST_USER_FOR;
    const password = process.env.TEST_PASSWORD_FOR;
    if (!email || !password) {
      throw new Error('TEST_USER_FOR и TEST_PASSWORD_FOR должны быть заданы');
    }
  // Ожидание загрузки основных ресурсов страницы
  await page.waitForLoadState('networkidle');

  // Нажать кноку "Вход"
  await page.getByRole('button', { name: 'Войти' }).click();

  //Заполнение полей email и пароль
  await page.locator('input[placeholder="Email"]').fill(email);
  await page.locator('input[placeholder="Пароль"]').fill(password);

  //Вход
  await page.locator('form').getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByRole('button', { name: 'user Профиль' })).toBeVisible();
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});