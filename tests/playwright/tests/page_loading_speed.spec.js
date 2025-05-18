import { test, expect } from '@playwright/test';

test('Скорость загрузки страницы (<3 сек)', async ({ page}) => {
  const startTime = Date.now();
  await page.goto('http://hexling.ru/');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);
});