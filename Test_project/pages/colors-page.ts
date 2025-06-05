import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class ColorsPage extends BasePage {
  clickSanphamPage = "text=Sản Phẩm";
  productItems = ".card";
  colorInput = "input.round-checkbox";

  

  constructor(page: Page) {
    super(page);
  }
  async gotoSanPhamPage(): Promise<void>  {
    await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
    await this.page.click(this.clickSanphamPage);
  }
  getColorInputByRGB = (rgb: string) => `form.color-code[style*="${rgb}"] >> xpath=preceding-sibling::input`;
  
  async selectColorByRGB(rgb: string) {
    const checkbox = this.page.locator(this.getColorInputByRGB(rgb));
    if (!(await checkbox.count())) {
      throw new Error(`Checkbox cho màu ${rgb} không tìm thấy!`);
    }
    if (!(await checkbox.isChecked())) {
      await checkbox.check({ force: true });
      await expect(checkbox).toBeChecked();
    }
  }
  async unselectColorByRGB(rgb: string) {
    const checkbox = this.page.locator(this.getColorInputByRGB(rgb));
    if (!(await checkbox.count())) {
      throw new Error(`Checkbox cho màu ${rgb} không tìm thấy!`);
    }
    if (await checkbox.isChecked()) {
      await checkbox.uncheck({ force: true });
      await expect(checkbox).not.toBeChecked();
    }
  }

  async waitForProductCountToChange(previousCount: number, timeout = 10000) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const currentCount = await this.page.locator(this.productItems)
        .filter({ hasNot: this.page.locator('[style*="display: none"]') }) // bỏ item bị ẩn (nếu có)
        .count();

      if (currentCount !== previousCount) {
        console.log(`🟢 Product count changed: ${previousCount} → ${currentCount}`);
        return;
      }

      await this.page.waitForTimeout(200); // Poll mỗi 200ms
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