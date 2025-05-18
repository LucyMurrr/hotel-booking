import { test, expect } from '../fixtures/auth.fixture';

test('test', async ({ page }) => {
  await page.waitForLoadState('networkidle');
  await page.click('a[href="/hotels/1"]');
  await page.locator('div').filter({ hasText: /^\$199\.99 \/ ночьЗабронировать$/ }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Start date' }).click();
  await page.getByTitle('-05-15').locator('div').click();
  await expect(page.getByRole('textbox', { name: 'Start date' })).toHaveText('');
});
