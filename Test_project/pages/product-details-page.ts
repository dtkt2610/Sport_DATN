import { Page } from '@playwright/test';
import { BasePage } from './base-page';
import { colorMap, sizeButtonsDetails } from "../shared/constants";

export class ProductDetailPage extends BasePage {
    clickSanphamPage = "text=Sản Phẩm";
    productItems = ".card";

    sizeButtons = 'p:has-text("Kích cỡ:") + div .custom-button';
    colorButtons = 'p:has-text("Màu sắc:") + div .custom-button';
    quantityInput = '.product-count .inputSpinner input';
    plusButton = '#input-spinner-right-button';
    minusButton = '#input-spinner-left-button';
    addToCardButton = '.add-to-cart2.btn.btn-default'; // đã sửa lại selector bị sai
    cartIcon = 'a[href="/gio-hang"] .fa-cart-shopping';
    cartBadge = 'a[href="/gio-hang"] .badge.bg-danger';

    constructor(page: Page) {
        super(page);
    }

    async gotoSanPhamPage(): Promise<void> {
        await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
        await this.page.click(this.clickSanphamPage);
    }
    async clickProductByName(productName: string) {
        const productTitleLocator = this.page.locator(`.card-title.h5:has-text("${productName}")`);
        await productTitleLocator.first().click();
    }

    async selectColorByName(colorName: string) {
        const rgbValue = colorMap[colorName];
        if (!rgbValue) throw new Error(`Không tìm thấy mã màu cho: ${colorName}`);

        const buttons = this.page.locator(this.colorButtons);
        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const btn = buttons.nth(i);
            const bgColor = await btn.evaluate(el => window.getComputedStyle(el).backgroundColor);
            if (bgColor === rgbValue) {
                await btn.click();
                return;
            }
        }

        throw new Error(`Không tìm thấy nút màu tương ứng với màu ${colorName} (${rgbValue})`);
    }


    async selectSizeByName(size: string) {
        const selector = sizeButtonsDetails[size];
        if (!selector) throw new Error(`Không tìm thấy selector cho size: ${size}`);

        const locator = this.page.locator(selector);
        const count = await locator.count();
        console.log(`Found ${count} elements for size ${size}`);

        if (count === 0) throw new Error(`Không tìm thấy nút size ${size} trên trang.`);

        const disabled = await locator.getAttribute('aria-disabled');
        if (disabled === 'true') {
            throw new Error(`Nút size ${size} đang bị disable, không thể click.`);
        }

        await locator.scrollIntoViewIfNeeded();
        await locator.click();
    }




    async setQuantity(quantity: number) {
        const current = await this.page.locator(this.quantityInput).inputValue();
        const diff = quantity - parseInt(current);
        for (let i = 0; i < Math.abs(diff); i++) {
            if (diff > 0) await this.page.locator(this.plusButton).click();
            else await this.page.locator(this.minusButton).click();
        }
    }

    async addToCart() {
        await this.page.locator(this.addToCardButton).click();
    }

    async gotoCartPage() {
        await this.page.goto('http://localhost:3000/gio-hang');
    }

    async clearAllCartItems() {
        await this.gotoCartPage();
        const deleteButtons = this.page.locator('button.fa-trash');

        while (await deleteButtons.count() > 0) {
            await deleteButtons.first().click();
            await this.page.waitForTimeout(500); // đợi cập nhật sau mỗi lần xóa
        }

        // Chờ badge cập nhật hoặc biến mất
        await this.page.waitForFunction(() => {
            const badge = document.querySelector('a[href="/gio-hang"] .badge.bg-danger');
            return !badge || badge.textContent === '0';
        });
    }

}
