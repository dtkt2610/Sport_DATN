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
    input = 'input.form-control';
    plusBtn = '#input-spinner-right-button';
    minusBtn = '#input-spinner-left-button';

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
            const normalizedText = cellText.replace(/\s+/g, " ").toLowerCase();

            const hasName = normalizedText.includes(productName.toLowerCase());
            const hasSize = normalizedText.includes(size.toLowerCase());

            const colorLocator = row.locator(this.colorSpan);
            let colorStyle = "";
            try {
                await colorLocator.waitFor({ state: "visible", timeout: 3000 });
                colorStyle = await colorLocator.evaluate(el => getComputedStyle(el).backgroundColor);
            } catch {
                continue;
            }

            const matchColor = colorStyle.replace(/\s+/g, "") === colorRgb.replace(/\s+/g, "");

            if (hasName && hasSize && matchColor) {
                return row;
            }
        }

        throw new Error(`Không tìm thấy sản phẩm: ${productName}, size: ${size}, màu: ${colorRgb}`);
    }

    async updateQuantity(params: {
        productName: string;
        size: string;
        colorRgb: string;
        quantity: number;
    }) {
        const row = await this.findRowBy(params);
        const inputLocator = row.locator('input.form-control');
        const plusBtn = row.locator('#input-spinner-right-button');
        const minusBtn = row.locator('#input-spinner-left-button');

        // DEBUG: log HTML của dòng sản phẩm
        console.log("👉 Row HTML:", await row.innerHTML());

        // Lấy số lượng hiện tại
        let currentQty = parseInt(await inputLocator.inputValue(), 10);
        const targetQty = params.quantity;
        const diff = targetQty - currentQty;

        if (diff === 0) return;

        const btn = diff > 0 ? plusBtn : minusBtn;
        const steps = Math.abs(diff);

        for (let i = 0; i < steps; i++) {
            await btn.click();
            await inputLocator.dispatchEvent('input');
            await inputLocator.dispatchEvent('change');
            await this.page.waitForTimeout(300);
        }

        // ✅ Kiểm tra cuối cùng
        const finalQty = parseInt(await inputLocator.inputValue(), 10);
        console.log(`🔍 Kỳ vọng: ${targetQty}, Thực tế: ${finalQty}`);
        expect(finalQty).toBe(targetQty);
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
    async expectItemInCart(params: {
        productName: string;
        size: string;
        colorRgb: string;
        quantity: number;
    }) {
        const row = await this.findRowBy(params);
        const qtyInput = row.locator(this.quantityInput);
        const qty = await qtyInput.inputValue();

        expect(Number(qty)).toBe(params.quantity);
    }

}
