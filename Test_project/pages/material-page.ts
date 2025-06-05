import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { materialCheckboxes } from "../shared/constants";

export class MaterialPage extends BasePage {
  // Selector
  clickSanphamPage = "text=Sản Phẩm";
  productItems = ".card";

  // Map tên cổ áo sang selector checkbox
  

  constructor(page: Page) {
    super(page);
  }

  // 👉 Điều hướng đến trang Sản phẩm
  async gotoSanPhamPage(): Promise<void> {
    await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
    await this.page.click(this.clickSanphamPage);
  }

  // 👉 Chọn
  async selectCollars(...labels: string[]): Promise<void> {
    for (const label of labels) {
      const selector = materialCheckboxes[label];
      if (selector) {
        const checkbox = this.page.locator(selector);
        if (!(await checkbox.isChecked())) {
          await checkbox.check();
        }
      }
    }
  }

  // 👉 Bỏ chọn 
  async unselectCollars(...labels: string[]): Promise<void> {
    for (const label of labels) {
      const selector = materialCheckboxes[label];
      if (selector) {
        const checkbox = this.page.locator(selector);
        if (await checkbox.isChecked()) {
          await checkbox.uncheck();
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
