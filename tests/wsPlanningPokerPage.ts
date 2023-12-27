import type { Page, Locator } from '@playwright/test';

export class WsPlanningPokerPage {
    public readonly nameInputBox: Locator;
    public readonly isAdminCheckbox: Locator;
    public readonly joinButton: Locator;

    constructor(public readonly page: Page) {
        this.nameInputBox = this.page.locator('name-input');
        this.isAdminCheckbox = this.page.locator('is-scrum-master-checkbox');
        this.joinButton = this.page.locator('join-planning-poker-button')
    }

    async goToDefault() {
        await this.page.goto("https://default.wsplanningpoker.com");
    }

    async goToOffice() {
        await this.page.goto("https://office.wsplanningpoker.com");
    }

    async goToLocal() {
        await this.page.goto("http://localhost:3000");
    }
}