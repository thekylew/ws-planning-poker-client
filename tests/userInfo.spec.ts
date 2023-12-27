import { test, expect } from "@playwright/test";
import { WsPlanningPokerPage } from "./wsPlanningPokerPage";

test.describe("Page Title Tests", () => {
  let wsPlanningPokerPage: WsPlanningPokerPage;

  test.beforeEach(async ({ page }) => {
    wsPlanningPokerPage = new WsPlanningPokerPage(page);
  });

  test("office.wsplanningpoker.com has correct title based on subdomain", async ({ page }) => {
    await wsPlanningPokerPage.goToOffice();

    await expect(page).toHaveTitle("Office Planning Poker");
  });

  test("default.wsplanningpoker.com has correct title based on subdomain", async ({ page }) => {
    await wsPlanningPokerPage.goToDefault();

    await expect(page).toHaveTitle("Default Planning Poker");
  });

  test("localhost has correct title based on fallback", async ({ page }) => {
    await wsPlanningPokerPage.goToLocal();

    await expect(page).toHaveTitle("Development Planning Poker");
  });
});

test.describe("User Info Form Tests", () => {
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

  test("Scrum Master checkbox is unchecked on page load", async () => {
    const isScrumMasterCheckboxChecked = await wsPlanningPokerPage.isAdminCheckbox.isChecked();

    expect(isScrumMasterCheckboxChecked).toBe(false);
  })

  test("Join button is disabled when name input is empty", async () => {
    const isButtonChecked = await wsPlanningPokerPage.joinButton.isDisabled();

    expect(isButtonChecked).toBe(true);
  })

  test("Join button is disabled when name input is filled", async () => {
    await wsPlanningPokerPage.nameInput.fill('Test User');

    const isButtonChecked = await wsPlanningPokerPage.joinButton.isDisabled();

    expect(isButtonChecked).toBe(false);
  })
});