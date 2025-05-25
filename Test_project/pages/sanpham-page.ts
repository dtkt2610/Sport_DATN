import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class SanphamPage extends BasePage {
    cssClickSanphamPage = "text=Sản Phẩm";
    cssSearchInput = "input[id='searchInput']";
    cssProductItems = ".card";

    constructor(page: Page) {
        super(page);
    }

    async gotoSanPhamPage() {
        await this.page.waitForSelector(this.cssClickSanphamPage, { state: "visible" });
        await this.page.click(this.cssClickSanphamPage);
        await this.page.waitForSelector(this.cssSearchInput, { state: "visible" });
    }

    async searchProduct(keyword: string) {
        // Chặn và ghi log các yêu cầu API
        await this.page.route("**/api/**", (route) => {
            console.log("API request:", route.request().url());
            route.continue();
        });

        await this.page.fill(this.cssSearchInput, keyword);
        console.log(`Entered keyword: ${keyword}`);
        await this.page.press(this.cssSearchInput, "Enter");
        // Hoặc: await this.page.click("button[type='submit']");

        await this.page.screenshot({ path: `screenshot-after-enter-${keyword}.png` });

        // Đợi kết quả tìm kiếm hiển thị
        await this.page.waitForSelector(`${this.cssProductItems} .card-title.h5`, {
            state: "visible",
            timeout: 10000,
        });
        await this.page.screenshot({ path: `screenshot-results-${keyword}.png` });
    }

    async verifyResultsContainKeyword(keyword: string) {
        const items = this.page.locator(this.cssProductItems);
        const count = await items.count();
        console.log(`Found ${count} items`);

        expect(count).toBeGreaterThan(0); // Đảm bảo có sản phẩm hiển thị

        let hasMatchingProduct = false;
        for (let i = 0; i < count; i++) {
            const title = await items.nth(i).locator(".card-title.h5").innerText();
            console.log(`Item ${i + 1} title: ${title}`);
            if (title.toLowerCase().includes(keyword.toLowerCase())) {
                hasMatchingProduct = true;
                break;
            }
        }
        expect(hasMatchingProduct).toBe(true); // Đảm bảo ít nhất một sản phẩm khớp
    }
}