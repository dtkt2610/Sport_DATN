import { test, expect } from '@playwright/test';
import { SizePage } from '../pages/size-page';
import { SizeFilterTestCase, sizeFilterData } from '../utils/size-data';

test.describe('Lọc sản phẩm theo kích cỡ', () => {
  let sizePage: SizePage;

  test.beforeEach(async ({ page }) => {
    sizePage = new SizePage(page);
    await sizePage.navigateToHome(); // Đảm bảo bạn có hàm này trong BasePage
    await sizePage.gotoSanPhamPage();
  });

  for (const testCase of sizeFilterData) {
    test(`${testCase.id} - ${testCase.description}`, async () => {
      const sizes = Array.isArray(testCase.productSizes)
        ? testCase.productSizes
        : [testCase.productSizes];

      // Chọn từng kích cỡ
      for (const size of sizes) {
        await sizePage.selectSize(size);
        await sizePage.expectSizeButtonActive(size);
      }

      const count = await sizePage.getProductCount();

      // Nếu mong đợi không có sản phẩm
      if (testCase.expected.expectNoProduct) {
        expect(count).toBe(0);
        await sizePage.expectNoProductMessageVisible();
        return;
      }

      // Nếu mong đợi số lượng sản phẩm chính xác
      if (typeof testCase.expected.productCount === 'number') {
        expect(count).toBe(testCase.expected.productCount);
      }

      // Nếu mong đợi ít nhất bao nhiêu sản phẩm
      if (typeof testCase.expected.minProductCount === 'number') {
        expect(count).toBeGreaterThanOrEqual(testCase.expected.minProductCount);
      }
    });
  }
  test.afterAll(async ({ page }) => {
    page.close();
  });
});
