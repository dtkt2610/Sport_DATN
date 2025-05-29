import { test, expect } from "@playwright/test";
import { PriceRangePage } from "../pages/price-range-page";
import { priceRangeData, PriceRangeTestCase } from "../utils/price-range-data";

test.describe("Kiểm thử lọc sản phẩm theo khoảng giá", () => {
  let priceRangePage: PriceRangePage;
  const TIMEOUT = process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT) : 15000;

  test.beforeEach(async ({ page }) => {
    priceRangePage = new PriceRangePage(page);
    await priceRangePage.navigateToHome();
    await priceRangePage.gotoSanPhamPage();
    await expect(page.locator(priceRangePage.productItems).first()).toBeVisible({ timeout: TIMEOUT });
  });

  test.afterAll(async ({ page }) => {
    await page.close();
  });

  for (const testCase of priceRangeData) {
    test(testCase.description, async ({ page }) => {
      console.log(`Chạy test case: ${testCase.id} - ${testCase.description}`);
      try {
        if (!testCase.ranges || testCase.ranges.length === 0) {
          throw new Error(`Test case ${testCase.id} không có ranges hợp lệ`);
        }

        for (const range of testCase.ranges) {
          if (range.min === undefined || range.max === undefined || isNaN(range.min) || isNaN(range.max) || range.min < 0 || range.max < range.min) {
            throw new Error(`Khoảng giá không hợp lệ trong ${testCase.id}: min=${range.min}, max=${range.max}`);
          }

          await priceRangePage.setPriceRange(range.min, range.max);
          await priceRangePage.verifyProductsInPriceRange(range.min, range.max, testCase.expectEmpty ?? false);

          const products = await page.locator(priceRangePage.productItems).all();
          console.log(`Số sản phẩm (${range.min} - ${range.max}): ${products.length}`);

          if (!testCase.expectEmpty) {
            expect(products.length).toBeGreaterThan(0);
          }

          const minSlider = await page.locator(priceRangePage.priceSliderMin).getAttribute("aria-valuenow");
          const maxSlider = await page.locator(priceRangePage.priceSliderMax).getAttribute("aria-valuenow");
          if (minSlider === null || maxSlider === null) {
            throw new Error(`Không lấy được giá trị aria-valuenow: min=${minSlider}, max=${maxSlider}`);
          }

          if (!testCase.expectEmpty) {
            expect(parseFloat(minSlider)).toBeCloseTo(range.min, 0);
            expect(parseFloat(maxSlider)).toBeCloseTo(range.max, 0);
          }
        }
      } catch (error) {
        console.error(`Test case ${testCase.id} thất bại: ${error.message}`);
        throw error;
      }
    });
  }
});