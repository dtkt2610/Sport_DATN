import { expect, test } from "@playwright/test";
import { ColorsPage } from "../pages/colors-page";
import { ColorData, ColorTestCase } from "../data/color-data";
import { count } from "console";
import { colorMap } from "../shared/constants";

test.describe("Lọc sản phẩm theo màu sắc", () => {
  for (const testCase of ColorData) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
      const colorPage = new ColorsPage(page);

      await colorPage.navigateToHome();
      await colorPage.gotoSanPhamPage();

      const initialCount = await colorPage.getVisibleProductCount();

      for (const colorKey of testCase.initialSelection) {
        const rgb = colorMap[colorKey];
        await colorPage.selectColorByRGB(rgb);
      }

      await colorPage.waitForProductCountToChange(initialCount);
      const filteredCount = await colorPage.getVisibleProductCount();

      if (testCase.unselectAfter) {
        for (const color of testCase.initialSelection) {
          const rgb = colorMap[color];
          await colorPage.unselectColorByRGB(rgb);
        }

        // Chờ cập nhật sau khi bỏ chọn
        await colorPage.waitForProductCountToChange(filteredCount);

        // Nếu có chọn lại màu khác
        if (testCase.reselect) {
          const afterUnselectCount = await colorPage.getVisibleProductCount();

          for (const color of testCase.reselect) {
            const rgb = colorMap[color];
            await colorPage.selectColorByRGB(rgb);
          }
          await colorPage.waitForProductCountToChange(afterUnselectCount);
          const finalCount = await colorPage.getVisibleProductCount();
          console.log(`🟢 Hiển thị ${finalCount} sản phẩm sau khi chọn lại.`);
        }
        await page.close();
      }
    });
  }
});