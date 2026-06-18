import { test, expect } from '@playwright/test';

test('app renders the board and controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.board')).toBeVisible();
  await expect(page.locator('.square').first()).toBeVisible();
  await expect(page.locator('.v-btn:has(.mdi-play)')).toBeVisible();
});

test('user can draw on the board and start a game', async ({ page }) => {
  await page.goto('/');

  const firstCell = page.locator('.square').first();
  await firstCell.click();
  await expect(firstCell).toHaveClass(/black/);

  await page.locator('.v-btn:has(.mdi-play)').click();
  await expect(page.locator('.mdi-stop')).toBeVisible();
});

test('win dialog appears when the puzzle is solved', async ({ page }) => {
  await page.goto('/');

  // An all-zero resultBoard matches the all-zero initial gameBoard, so the
  // game completes the moment play starts.
  await page.locator('.v-btn:has(.mdi-play)').click();
  await expect(page.locator('.mdi-trophy')).toBeVisible();
});
