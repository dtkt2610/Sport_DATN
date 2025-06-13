import { test, expect } from "@playwright/test";
import { PriceRangePage } from "../pages/price-range-page";
import { priceRangeData } from "../utils/price-range-data";

const TIMEOUT = process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT) : 15000;
const FULL_MIN = 0;
const FULL_MAX = 1550000;
const TOLERANCE = 20000;

test.describe("🔍 Kiểm thử lọc sản phẩm theo khoảng giá", () => {
  for (const testCase of priceRangeData) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
      const priceRangePage = new PriceRangePage(page);

      await priceRangePage.navigateToHome();
      await priceRangePage.gotoSanPhamPage();

      await expect(page.locator(priceRangePage.productItems).first()).toBeVisible({ timeout: TIMEOUT });

      if (!testCase.ranges?.length) {
        throw new Error(`❌ Test case ${testCase.id} không có dữ liệu khoảng giá`);
      }

      for (const range of testCase.ranges) {
        const { min, max, expectEmpty, expectedEmptyText } = range;

        await test.step(`🧪 Kiểm tra khoảng giá: min=${min}, max=${max}`, async () => {
          if (min == null || max == null || isNaN(min) || isNaN(max) || min < 0 || max < min) {
            throw new Error(`❌ Khoảng giá không hợp lệ: min=${min}, max=${max}`);
          }

          // Reset slider về toàn bộ
          await priceRangePage.setPriceRange(FULL_MIN, FULL_MAX);
          await page.waitForTimeout(300);

          // Thiết lập lại khoảng giá mong muốn
          await priceRangePage.setPriceRange(min, max);
          await page.waitForTimeout(300);

          // 👉 Bỏ qua kiểm tra slider nếu expectEmpty === true
          if (!expectEmpty) {
            const minSliderVal = await page.locator(priceRangePage.priceSliderMin).getAttribute("aria-valuenow");
            const maxSliderVal = await page.locator(priceRangePage.priceSliderMax).getAttribute("aria-valuenow");

            expect(minSliderVal).not.toBeNull();
            expect(maxSliderVal).not.toBeNull();

            const actualMin = parseFloat(minSliderVal!);
            const actualMax = parseFloat(maxSliderVal!);

            expect(Math.abs(actualMin - min)).toBeLessThanOrEqual(TOLERANCE);
            expect(Math.abs(actualMax - max)).toBeLessThanOrEqual(TOLERANCE);
          } else {
            console.log(`ℹ️ Bỏ qua kiểm tra slider vì expectEmpty=true`);
          }

          // 👉 Log giá sản phẩm đầu tiên nếu có
          const productCount = await page.locator(priceRangePage.productPrice).count();
          if (productCount > 0) {
            const firstProductPrice = await page.locator(priceRangePage.productPrice).first().textContent();
            console.log(`💰 Giá sản phẩm đầu tiên: ${firstProductPrice?.trim()}`);
          } else {
            console.log("💰 Không có sản phẩm nào được hiển thị.");
          }

          // 👉 Kiểm tra sản phẩm hiển thị trong khoảng giá
          await priceRangePage.verifyProductsInPriceRange(min, max, expectEmpty, expectedEmptyText);
        });
      }
    });
  }
});
