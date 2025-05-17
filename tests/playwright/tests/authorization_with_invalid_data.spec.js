import { test, expect } from '@playwright/test';
import parser from '../utils/parser';


const testData = parser('./utils/auth/user.json');

test('test', async ({ page }) => {
  // Переход на страницу
  await page.goto('http://hexling.ru/');
  // Ожидание загрузки основных ресурсов страницы
  await page.waitForLoadState('networkidle');
  const email = process.env.TEST_USER_FOR;
  // Нажать кноку "Вход"
  await page.getByRole('button', { name: 'Войти' }).click();

  // Нажать кноку "Вход"
  await page.getByRole('button', { name: 'Войти' }).click();

  //Заполнение полей email и пароль
  await page.locator('input[placeholder="Email"]').fill(email);
  await page.locator('input[placeholder="Пароль"]').fill('password');
  //Вход
  await page.locator('form').getByRole('button', { name: 'Войти' }).click();
  // Проверка наличия ведомления 'Неверные логин или пароль, попробуйте ещё раз'
  await expect(page.getByText('Неверные логин или пароль, попробуйте ещё раз')).toBeVisible();
});