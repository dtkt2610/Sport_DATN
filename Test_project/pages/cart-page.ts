import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class CartPage extends BasePage {
    cartUrl = "http://localhost:3000/gio-hang";

    tableRow = 'table tr:has(td input[type="checkbox"])'; // loại trừ dòng header
    trashButton = 'button.fa-trash';
    quantityInput = 'input.form-control';
    colorSpan = 'td:nth-child(3) .color-circle';
    productTextCell = 'td:nth-child(3)';
    checkbox = 'td input[type="checkbox"]';
    proceedToCheckoutBtn = 'button.btn.btn-success';
    alertError = '.Toastify__toast--error';
    emptyCartMessage = 'div.text-error:has-text("Không có sản phẩm nào trong giỏ hàng")';

    constructor(page: Page) {
        super(page);
    }

    async gotoCartPage(): Promise<void> {
        await this.page.goto(this.cartUrl);
    }

    async findRowBy({ productName, size, colorRgb }: { productName: string, size: string, colorRgb: string }) {
        const rows = this.page.locator(this.tableRow);
        const count = await rows.count();

        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);

            const cellText = await row.locator(this.productTextCell).innerText();
            const [nameLine, sizeColorLine] = cellText.split("\n").map(t => t.trim());

            const sizeFromCell = sizeColorLine.split("-")[0].trim();

            const colorStyle = await row.locator(this.colorSpan).evaluate(el =>
                getComputedStyle(el).backgroundColor
            );

            // Debug log (xóa khi chạy thực tế)
            console.log("[DEBUG] Tìm sản phẩm:", {
                nameLine, sizeFromCell, colorStyle,
                expected: { productName, size, colorRgb }
            });

            const matchName = nameLine === productName;
            const matchSize = sizeFromCell === size;
            const matchColor = colorStyle.replace(/\s+/g, "") === colorRgb.replace(/\s+/g, "");

            if (matchName && matchSize && matchColor) {
                return row;
            }
        }

        throw new Error(`Không tìm thấy sản phẩm: ${productName}, size: ${size}, màu: ${colorRgb}`);
    }

    async expectItemInCart(params: { productName: string, size: string, colorRgb: string, quantity: number }) {
        await this.gotoCartPage();
        const row = await this.findRowBy(params);
        const qty = await row.locator(this.quantityInput).inputValue();
        expect(Number(qty)).toBe(params.quantity);
    }

    async updateQuantity(params: { productName: string, size: string, colorRgb: string, quantity: number }) {
        const row = await this.findRowBy(params);
        await row.locator(this.quantityInput).fill(params.quantity.toString());
        await this.page.waitForTimeout(500);
    }

    async deleteItem(params: { productName: string, size: string, colorRgb: string }) {
        const row = await this.findRowBy(params);
        await row.locator(this.trashButton).click();
        await this.page.waitForTimeout(500);
    }

    async selectItem(params: { productName: string, size: string, colorRgb: string }) {
        const row = await this.findRowBy(params);
        const box = row.locator(this.checkbox);
        if (!(await box.isChecked())) {
            await box.check();
        }
    }

    async clickProceedToCheckout() {
        await this.page.locator(this.proceedToCheckoutBtn).click();
    }

    async expectEmptyCart() {
        await this.gotoCartPage();
        await expect(this.page.locator(this.emptyCartMessage)).toBeVisible();
    }

    async expectErrorMessage(message: string) {
        const alert = this.page.locator(this.alertError);
        await expect(alert).toContainText(message);
    }
}
