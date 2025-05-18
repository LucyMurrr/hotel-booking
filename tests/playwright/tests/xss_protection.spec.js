import { test, expect } from '@playwright/test';

test('3.2.2 - Защита от XSS', async ({ page }) => {
  // Тестовые XSS-векторы
  const testPayloads = [
    '<script>alert("XSS")</script>',
    '<img src="x" onerror="alert(\'XSS\')">',
    '<svg/onload=alert("XSS")>'
  ];

  // Переходим на главную страницу
  await page.goto('http://hexling.ru/');
  
  // Находим поле поиска
  const searchInput = page.locator('input[placeholder="Поиск по названию отеля"]');
  await expect(searchInput).toBeVisible();

  // Проверяем каждый XSS-вектор
  for (const payload of testPayloads) {
    // Вводим и отправляем payload
    await searchInput.fill(payload);
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');

    // Проверяем отсутствие payload в DOM
    await expect(page.locator('body')).not.toContainText(payload);

    // Проверяем всплывающие окна
    let dialogDetected = false;
    page.on('dialog', dialog => {
      dialogDetected = true;
      dialog.dismiss();
    });

    await page.waitForTimeout(500);
    expect(dialogDetected, `Обнаружен XSS через ${payload}`).toBe(false);
  }
});