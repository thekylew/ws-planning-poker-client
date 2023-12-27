import { test, expect } from "@playwright/test";
import { WsPlanningPokerPage } from "./wsPlanningPokerPage";

test.describe("Page Title Tests", () => {
  let wsPlanningPokerPage: WsPlanningPokerPage;

  test.beforeEach(async ({ page }) => {
    wsPlanningPokerPage = new WsPlanningPokerPage(page);
  });

  test("office.wsplanningpoker.com has correct title based on subdomain", async ({ page }) => {
    //go to Office subdomain
    await wsPlanningPokerPage.goToOffice();

    //page title should be Office Planning Poker
    await expect(page).toHaveTitle("Office Planning Poker");
  });

  test("default.wsplanningpoker.com has correct title based on subdomain", async ({ page }) => {
    //go to Default subdomain
    await wsPlanningPokerPage.goToDefault();

    //page title should be Office Planning Poker
    await expect(page).toHaveTitle("Default Planning Poker");
  });

  test("localhost has correct title based on fallback", async ({ page }) => {
    //go to Default subdomain
    await wsPlanningPokerPage.goToLocal();

    //page title should be Office Planning Poker
    await expect(page).toHaveTitle("Development Planning Poker");
  });
});

test.describe("User Info Entry Tests", () => {
  let wsPlanningPokerPage: WsPlanningPokerPage;

  test.beforeEach(async ({ page }) => {
    wsPlanningPokerPage = new WsPlanningPokerPage(page);
    await wsPlanningPokerPage.goToLocal();
  })

  test("Name entry works", async () => {
    await wsPlanningPokerPage.nameInput.fill('Test User');
    
    const nameValue = await wsPlanningPokerPage.nameInput.inputValue();

    expect(nameValue).toBe('Test User');
  });
});