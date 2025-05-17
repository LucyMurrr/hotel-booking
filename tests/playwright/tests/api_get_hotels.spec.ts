import { test, expect } from '@playwright/test';

// Конфигурация тестов

test('GET /hotels - проверка структуры ответа', async ({ request }) => {
  const response = await request.get('http://hexling.ru/api/hotels');
  
  // Проверка статус-кода
  expect(response.status()).toBe(200);
  
  // Парсинг JSON
  const responseData = await response.json();
  
  // Проверка общей структуры
  expect(responseData).toHaveProperty('data');
  expect(responseData).toHaveProperty('pagination');
  expect(responseData).toHaveProperty('filters');
  expect(responseData).toHaveProperty('sortBy');
  expect(responseData).toHaveProperty('sortOrder');
});