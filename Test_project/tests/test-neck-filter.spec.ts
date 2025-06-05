import { expect, test } from "@playwright/test";
import { NeckPage } from "../pages/neck-page"; 
import { NeckData } from "../utils/neck-data";

test.describe("Lọc sản phẩm theo cổ áo", () => {
  for (const testCase of NeckData){
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
      const neckPage = new NeckPage(page);

      // Bước 1: Vào trang sản phẩm
      await neckPage.navigateToHome();
      await neckPage.gotoSanPhamPage();

      // Bước 2: Lấy số lượng sản phẩm hiện tại
      const previousCount = await neckPage.getVisibleProductCount();
      

      // Bước 3: Chọn loại cổ áo ban đầu
      await neckPage.selectCollars(...testCase.initialSelection);
      await neckPage.waitForProductCountToChange(previousCount);

      const afterFirstSelectionCount = await neckPage.getVisibleProductCount();
      expect(afterFirstSelectionCount).toBeGreaterThanOrEqual(0);


      // Bước 4: Nếu cần bỏ chọn sau đó chọn loại khác
      if (testCase.unselectAfter && testCase.reselect) {
        // Bỏ chọn tất cả initialSelection
        await neckPage.unselectCollars(...testCase.initialSelection);
        const countAfterUnselect = await neckPage.getVisibleProductCount();

        // Chọn lại loại mới
        await neckPage.selectCollars(...testCase.reselect);
        await neckPage.waitForProductCountToChange(countAfterUnselect);

        const finalCount = await neckPage.getVisibleProductCount();
        expect(finalCount).toBeGreaterThanOrEqual(0);
      }
      await page.close();
    });
  }
});
