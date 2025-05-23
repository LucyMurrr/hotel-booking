import { test, expect } from '../fixtures/auth.fixture';

test('Нельзя забронировать на недоступную дату', async ({ page }) => {
  await page.waitForLoadState('networkidle');
  await page.click('a[href="/hotels/11"]');
  await page.getByRole('button', { name: 'Забронировать' }).first().click();
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByTitle('-05-15').locator('div').click();
  await expect(page.getByRole('textbox', { name: 'Start date' })).toHaveText('');
  await page.getByRole('button', { name: 'user Профиль' }).click();
  await page.getByRole('link', { name: 'Выход' }).click();
});
