import { expect, Page } from '@playwright/test';
import { BasePage } from "./base-page";
import { sizeCheckboxes } from '../shared/constants';

// Page Object cho trang sản phẩm
export class SizePage extends BasePage {
    clickSanphamPage = "text=Sản Phẩm";
    productItems = ".card";
    sizeFilterButton = (size: string) => `.custom-button.btn.btn-secondary:has-text("${size}")`;


    
    constructor(page: Page) {
        super(page);
    }

    // Điều hướng đến trang Sản Phẩm
    async gotoSanPhamPage() {
        await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
        await this.page.click(this.clickSanphamPage);
    }

    async selectSize(...labels: string[]): Promise<void> {
  for (const label of labels) {
    const selector = sizeCheckboxes[label];
    if (selector) {
      const button = this.page.locator(selector);
      const isActive = await button.evaluate(el => el.classList.contains('active'));
      if (!isActive) {
        await button.click();
      }
    }
  }
}

async unselectSize(...labels: string[]): Promise<void> {
  for (const label of labels) {
    const selector = sizeCheckboxes[label];
    if (selector) {
      const button = this.page.locator(selector);
      const isActive = await button.evaluate(el => el.classList.contains('active'));
      if (isActive) {
        await button.click();
      }
    }
  }
}


  // 👉 Chờ số lượng sản phẩm thay đổi
  async waitForProductCountToChange(previousCount: number, timeout = 10000): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const currentCount = await this.getVisibleProductCount();
      if (currentCount !== previousCount) {
        console.log(`🟢 Product count changed: ${previousCount} → ${currentCount}`);
        return;
      }
      await this.page.waitForTimeout(200);
    }
    throw new Error(`❌ Timeout: Product count did not change after ${timeout}ms`);
  }

  // 👉 Lấy số lượng sản phẩm đang hiển thị
  async getVisibleProductCount(): Promise<number> {
    return this.page.locator(this.productItems)
      .filter({ hasNot: this.page.locator('[style*="display: none"]') })
      .count();
  }

  // 👉 Đảm bảo không có sản phẩm nào đang hiển thị
  async expectNoProductsVisible(): Promise<void> {
    await expect(
      this.page.locator(this.productItems)
        .filter({ hasNot: this.page.locator('[style*="display: none"]') })
    ).toHaveCount(0);
  }
}
