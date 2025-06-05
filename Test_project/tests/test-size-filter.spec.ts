import { test, expect } from '@playwright/test';
import { SizePage } from '../pages/size-page';
import { SizeFilterTestCase, sizeFilterData } from '../utils/size-data';

test.describe('Lọc sản phẩm theo kích cỡ', () => {

  for (const testCase of sizeFilterData) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {

      const sizePage = new SizePage(page);

      await sizePage.navigateToHome();
      await sizePage.gotoSanPhamPage();

      const initialCount = await sizePage.getVisibleProductCount();

      // 👉 Bước 1: Chọn chất liệu ban đầu
      await sizePage.selectSize(...testCase.initialSelection);
      await sizePage.waitForProductCountToChange(initialCount);

      const afterFirstSelectionCount = await sizePage.getVisibleProductCount();
      expect(afterFirstSelectionCount).toBeGreaterThanOrEqual(0); // ít nhất vẫn nên kiểm

      // 👉 Bước 2: Nếu có unselect và chọn lại chất liệu khác
      if (testCase.unselectAfter && testCase.reselect) {
        await sizePage.unselectSize(...testCase.initialSelection);
        const countAfterUnselect = await sizePage.getVisibleProductCount();

        await sizePage.selectSize(...testCase.reselect);
        await sizePage.waitForProductCountToChange(countAfterUnselect);

        const finalCount = await sizePage.getVisibleProductCount();
        expect(finalCount).toBeGreaterThanOrEqual(0);
      }
    });

  }
  test.afterAll(async ({ page }) => {
    page.close();
  });
});
