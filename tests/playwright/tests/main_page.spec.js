import { test, expect } from '../fixtures/auth.fixture';

test('Отображение основных элементов страницы', async ({ page }) => {
  // Проверка заголовка и логотипа
  await expect(page.locator('header >> text=HEXLING')).toBeVisible();
  await expect(page.locator('header img[src="/logo.png"]')).toBeVisible();

  // Проверка наличия блока фильтров
  await expect(page.locator('.ant-card-head-title:has-text("Все фильтры")')).toBeVisible();
  await expect(page.locator('input[placeholder="Поиск по названию отеля"]')).toBeVisible();

  // Проверка наличия карточек отелей (минимум 1)
  const hotelCards = page.locator('.ant-card-hoverable');
  await expect(hotelCards.first()).toBeVisible();
  expect(await hotelCards.count()).toBeGreaterThan(0);

  // Проверка наличия пагинации
  await expect(page.locator('.ant-pagination-item-active >> text=1')).toBeVisible();

  // Проверка наличия селекторов звезд
  await expect(page.locator('.ant-select-selection-placeholder:has-text("Мин. количество звезд")')).toBeVisible();
  await expect(page.locator('.ant-select-selection-placeholder:has-text("Макс. количество звезд")')).toBeVisible();
  
  // Проверка наличия слайдера рейтинга
  await expect(page.locator('.ant-slider')).toBeVisible();
  
  // Проверка наличия кнопок
  await expect(page.locator('button:has-text("Сбросить")')).toBeVisible();
  await expect(page.locator('button:has-text("Применить")')).toBeVisible();
});