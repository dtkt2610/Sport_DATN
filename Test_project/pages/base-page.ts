import { Page } from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected url: string = process.env.BASE_URL || 'http://localhost:3000/trang-chu';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHome(): Promise<void> {
        try {
            await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        } catch (error) {
            console.error(`Không thể điều hướng đến ${this.url}:`, error);
            throw error;
        }
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }
}