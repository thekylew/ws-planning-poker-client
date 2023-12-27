import { test, expect } from '@playwright/test';

test('has title based on subdomain', async ({ page }) => {
  //go to Office subdomain
  await page.goto('https://office.wsplanningpoker.com');
  
  //page title should be Office Planning Poker
  await expect(page).toHaveTitle('Office Planning Poker');

  //go to Default subdomain
  await page.goto('https://default.wsplanningpoker.com');
  
  //page title should be Office Planning Poker
  await expect(page).toHaveTitle('Default Planning Poker');
});
