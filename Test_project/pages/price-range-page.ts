import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class PriceRangePage extends BasePage {
  clickSanphamPage = "text=Sản Phẩm";
  productItems = ".card";
  priceSliderMax = ".thumb.thumb-1[role='slider']";
  priceSliderMin = ".thumb.thumb-0[role='slider']";
  productPrice = ".card-text span";
  messageText = ".text-error";

  constructor(page: Page) {
    super(page);
  }

  async gotoSanPhamPage() {
    await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
    await this.page.click(this.clickSanphamPage);
  }

  async getVisibleProductCount(): Promise<number> {
    return this.page.locator(this.productItems)
      .filter({ hasNot: this.page.locator('[style*="display: none"]') })
      .count();
  }

  async moveMouseSlowly(fromX: number, toX: number, y: number, steps: number = 5) {
    const delta = (toX - fromX) / steps;
    for (let i = 0; i <= steps; i++) {
      await this.page.mouse.move(fromX + delta * i, y);
    }
  }

  async setPriceRange(min: number, max: number) {
    try {
      if (this.page.isClosed()) {
        throw new Error("❌ Page đã bị đóng trước khi setPriceRange.");
      }

      // ✅ Chờ slider và thumb hiển thị
      await this.page.waitForSelector(".slider", { state: "visible", timeout: 10000 });
      await this.page.waitForSelector(".thumb.thumb-0[role='slider']", { state: "visible", timeout: 5000 });
      await this.page.waitForSelector(".thumb.thumb-1[role='slider']", { state: "visible", timeout: 5000 });

      const minSlider = this.page.locator(".thumb.thumb-0[role='slider']");
      const maxSlider = this.page.locator(".thumb.thumb-1[role='slider']");
      const sliderContainer = this.page.locator('.slider');

      const sliderBox = await sliderContainer.boundingBox();
      if (!sliderBox) throw new Error('❌ Không lấy được boundingBox của slider');

      const { x: sliderLeft, width: sliderWidth, y: sliderY } = sliderBox;

      const maxPrice = 1550000;
      const minPrice = 0;
      const range = maxPrice - minPrice;

      const minOffsetRatio = (min - minPrice) / range;
      const maxOffsetRatio = (max - minPrice) / range;

      const minX = sliderLeft + sliderWidth * minOffsetRatio;
      const maxX = sliderLeft + sliderWidth * maxOffsetRatio;

      console.log(`🎯 Kéo slider từ ${min} đến ${max} (±20000)`);
      console.log(`➡️ Tọa độ minX=${minX.toFixed(2)}, maxX=${maxX.toFixed(2)}`);

      // ✅ Kéo min slider
      await minSlider.hover();
      await this.page.mouse.down();
      await this.moveMouseSlowly(sliderLeft, minX, sliderY);
      await this.page.mouse.up();
      await this.page.waitForTimeout(300);

      if (min === max) {
        console.log(`ℹ️ Không cần kéo maxSlider vì min = max = ${min}`);
        return;
      }

      // ✅ Kéo max slider
      await maxSlider.hover();
      await this.page.mouse.down();
      await this.moveMouseSlowly(sliderLeft + sliderWidth, maxX, sliderY);
      await this.page.mouse.up();
      await this.page.waitForTimeout(300);

      console.log(`✅ Kéo slider thành công [${min} - ${max}]`);
    } catch (err) {
      console.error(`❌ Lỗi khi setPriceRange(${min}, ${max}):`, err);
      await this.page.screenshot({ path: `error-setPrice-${min}-${max}.png`, fullPage: true });
      throw err;
    }
  }



  async verifyProductsInPriceRange(min: number, max: number, expectEmpty: boolean = false, expectedEmptyText?: string) {
    await this.page.waitForTimeout(1000);

    const products = await this.page.locator(this.productItems)
      .filter({ hasNot: this.page.locator('[style*="display: none"]') })
      .all();

    if (expectEmpty) {
      const alert = this.page.locator(this.messageText);
      await expect(alert).toHaveText(expectedEmptyText || "Không có sản phẩm nào phù hợp");
      if (products.length > 0) {
        throw new Error(`❌ Mong đợi không có sản phẩm, nhưng tìm thấy ${products.length} sản phẩm.`);
      }
      console.log(`✅ Không có sản phẩm như mong đợi và đã hiển thị thông báo.`);
      return;
    }

    if (products.length === 0) {
      throw new Error("❌ Không có sản phẩm nào hiển thị trong khi mong đợi có.");
    }

    console.log(`🔍 Số sản phẩm hiển thị: ${products.length}`);

    const invalidProducts: string[] = [];

    for (const [index, product] of products.entries()) {
      const priceText = await product.locator(this.productPrice).textContent();
      if (!priceText) continue;

      const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
      if (isNaN(price)) continue;

      if (price < min || price > max) {
        invalidProducts.push(`❌ Product ${index + 1}: Giá ${price} ngoài khoảng [${min} - ${max}]`);
      }
    }

    if (invalidProducts.length > 0) {
      console.error(`🚨 Các sản phẩm ngoài khoảng giá:\n${invalidProducts.join("\n")}`);
      throw new Error(`❌ Có sản phẩm nằm ngoài khoảng giá mong đợi.`);
    }

    console.log(`✅ Tất cả sản phẩm đều nằm trong khoảng giá hợp lệ.`);
  }
}
