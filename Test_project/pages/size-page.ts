import { expect, Page } from '@playwright/test';
import { BasePage } from "./base-page";

// Page Object cho trang sản phẩm
export class SizePage extends BasePage {
    private clickSanphamPage = "text=Sản Phẩm";
    private productItems = ".card";
    private noProductMessage = "text=Không tìm thấy sản phẩm";
    private sizeFilterButton = (size: string) => `.custom-button.btn.btn-secondary:has-text("${size}")`;

    constructor(page: Page) {
        super(page);
    }

    // Điều hướng đến trang Sản Phẩm
    async gotoSanPhamPage() {
        await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
        await this.page.click(this.clickSanphamPage);
    }

    // Lấy locator của nút kích cỡ
    getSizeButton(size: string) {
        return this.page.locator(this.sizeFilterButton(size));
    }

    // Chọn kích cỡ
    async selectSize(size: string) {
        await this.getSizeButton(size).click();
    }

    // Bỏ chọn kích cỡ nếu đang được chọn
    async deselectSize(size: string) {
        const button = this.getSizeButton(size);
        if (await button.evaluate((el: HTMLElement) => el.classList.contains('active'))) {
            await button.click();
        }
    }

    // Lấy số lượng sản phẩm đang hiển thị
    async getProductCount(): Promise<number> {
        return await this.page.locator(this.productItems).count();
    }

    // Kiểm tra sản phẩm hiển thị (ít nhất 1 sản phẩm)
    async expectSomeProductsVisible() {
        const count = await this.getProductCount();
        expect(count).toBeGreaterThan(0);
    }

    // Kiểm tra có hiển thị thông báo "không có sản phẩm"
    async expectNoProductMessageVisible() {
        await expect(this.page.locator(this.noProductMessage)).toBeVisible();
    }

    // Kiểm tra nút kích cỡ đang active
    async expectSizeButtonActive(size: string) {
        const button = this.getSizeButton(size);
        await expect(button).toHaveClass(/active/);
    }

    // Kiểm tra lọc theo size: có sản phẩm hoặc không
    async filterBySizeAndVerify(size: string) {
        await this.selectSize(size);
        await this.expectSizeButtonActive(size);

        const count = await this.getProductCount();
        if (count > 0) {
            console.log(`✅ Có ${count} sản phẩm hiển thị với size "${size}"`);
        } else {
            console.log(`❌ Không có sản phẩm nào cho size "${size}"`);
            await this.expectNoProductMessageVisible();
        }
    }
}
