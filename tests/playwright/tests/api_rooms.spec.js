import { test, expect } from '@playwright/test';

// Конфигурация тестов
const HOTEL_ID = 1;
const ROOMS_ENDPOINT = `http://hexling.ru/api/hotels/${HOTEL_ID}/rooms`;

test.describe(`API тесты для /hotels/${HOTEL_ID}/rooms`, () => {
  let response;
  let responseData;

  test.beforeEach(async ({ request }) => {
    response = await request.get(ROOMS_ENDPOINT);
    responseData = await response.json();
  });

  // Базовые тесты
  test('Должен возвращать статус 200', () => {
    expect(response.status()).toBe(200);
  });

  test('Должен возвращать application/json', () => {
    expect(response.headers()['content-type']).toContain('application/json');
  });

  // Тесты структуры ответа
  test('Ответ должен содержать правильную структуру', () => {
    expect(responseData).toEqual({
      data: expect.any(Array),
      pagination: expect.any(Object),
      filters: expect.any(Object),
      sortBy: expect.any(String),
      sortOrder: expect.any(String)
    });
  });

  // Тесты данных комнат
  test('Каждая комната должна иметь правильную структуру', () => {
    responseData.data.forEach(room => {
      expect(room).toEqual({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        price: expect.any(Number),
        hotelId: HOTEL_ID,
        amenities: expect.any(Array)
      });

      // Проверка amenities
      room.amenities.forEach(amenity => {
        expect(amenity).toEqual({
          id: expect.any(Number),
          name: expect.any(String)
        });
      });
    });
  });

  // Тесты фильтров
  test('Фильтры должны иметь правильную структуру', () => {
    expect(responseData.filters).toEqual({
      name: null,
      minPrice: null,
      maxPrice: null
    });
  });

  // Параметризованные тесты фильтрации
  const filterTestCases = [
    { 
      name: 'Фильтрация по минимальной цене',
      params: { minPrice: 300 },
      expectedCount: 1,
      validator: (room) => room.price >= 300
    },
    {
      name: 'Фильтрация по максимальной цене',
      params: { maxPrice: 200 },
      expectedCount: 1,
      validator: (room) => room.price <= 200
    },
    {
      name: 'Фильтрация по диапазону цен',
      params: { minPrice: 200, maxPrice: 300 },
      expectedCount: 1,
      validator: (room) => room.price >= 200 && room.price <= 300
    }
  ];

  for (const testCase of filterTestCases) {
    test(testCase.name, async ({ request }) => {
      const filteredResponse = await request.get(ROOMS_ENDPOINT, {
        params: testCase.params
      });
      const filteredData = await filteredResponse.json();
      
      expect(filteredData.data.length).toBe(testCase.expectedCount);
      filteredData.data.forEach(room => {
        expect(testCase.validator(room)).toBeTruthy();
      });
    });
  }

  // Тесты сортировки
  const sortTestCases = [
    {
      name: 'Сортировка по имени (ASC)',
      params: { sortBy: 'name', sortOrder: 'ASC' },
      validator: (a, b) => a.name.localeCompare(b.name)
    },
    {
      name: 'Сортировка по имени (DESC)',
      params: { sortBy: 'name', sortOrder: 'DESC' },
      validator: (a, b) => b.name.localeCompare(a.name)
    },
    {
      name: 'Сортировка по цене (ASC)',
      params: { sortBy: 'price', sortOrder: 'ASC' },
      validator: (a, b) => a.price - b.price
    }
  ];

  for (const testCase of sortTestCases) {
    test(testCase.name, async ({ request }) => {
      const sortedResponse = await request.get(ROOMS_ENDPOINT, {
        params: testCase.params
      });
      const sortedData = await sortedResponse.json();
      
      // Проверяем что данные отсортированы правильно
      for (let i = 0; i < sortedData.data.length - 1; i++) {
        const comparison = testCase.validator(sortedData.data[i], sortedData.data[i + 1]);
        expect(comparison).toBeLessThanOrEqual(0);
      }
    });
  }

  // Тесты на пустые результаты
  test('Фильтрация с несуществующими параметрами должна возвращать пустой массив', async ({ request }) => {
    const filteredResponse = await request.get(ROOMS_ENDPOINT, {
      params: { name: 'Non-existent Room' }
    });
    const filteredData = await filteredResponse.json();
    
    expect(filteredData.data.length).toBe(0);
  });

  // Тесты производительности
  test('Время ответа должно быть < 500мс', async ({ request }) => {
    const startTime = Date.now();
    await request.get(ROOMS_ENDPOINT);
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(500);
  });
});
