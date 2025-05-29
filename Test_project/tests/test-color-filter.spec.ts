import { expect, test } from "@playwright/test";
import { ColorsPage } from "../pages/colors-page";
import { Color, ColorData, ColorTestCase } from "../utils/color-data";

/*test.describe("Lọc sản phẩm theo màu sắc", () => {
  for (const testCase of ColorData) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
      const colorPage = new ColorsPage(page);
      await colorPage.navigateToHome();
      await colorPage.gotoSanPhamPage();

      const initialCount = await colorPage.countProduct();

      for (const colorKey of testCase.color) {
        const rgb = Color[colorKey];
        await colorPage.selectColorByRGB(rgb);
        await colorPage.waitForProductCountToChange(initialCount);
      }

      const filteredCount = await colorPage.countProduct();

      // So sánh đúng với expected đã khai báo
      expect(filteredCount).toBe(testCase.expected);

      // TC03 – bỏ chọn và kiểm tra về lại ban đầu
      if (testCase.id === "TC03") {
        for (const colorKey of testCase.color) {
          const rgb = Color[colorKey];
          await colorPage.unselectColorByRGB(rgb);
        }

        await colorPage.waitForProductCountToChange(filteredCount);
        const countAfterUncheck = await colorPage.countProduct();
        expect(countAfterUncheck).toBe(initialCount);
      }
    });
  }
});
 */

test.describe("Lọc sản phẩm theo màu sắc", () => {
  for (const testCase of ColorData) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
      const colorPage = new ColorsPage(page);

      // Điều hướng tới trang sản phẩm
      await colorPage.navigateToHome();
      await colorPage.gotoSanPhamPage();

      // Lấy số sản phẩm ban đầu
      const initialCount = await colorPage.countProduct();

      // Lọc theo từng màu trong test case
      for (const colorKey of testCase.color) {
        const rgb = Color[colorKey];
        if (!rgb) throw new Error(`Không tìm thấy RGB cho màu: ${colorKey}`);

        await colorPage.selectColorByRGB(rgb);
        await colorPage.waitForProductCountToChange(initialCount);
      }

      // Đếm lại sau khi lọc
      const filteredCount = await colorPage.countProduct();

      // So sánh với kết quả mong đợi
      expect(filteredCount).toBe(testCase.expected);

      // Nếu cần bỏ chọn (ví dụ TC03)
      if (testCase.shouldUncheck) {
        for (const colorKey of testCase.color) {
          const rgb = Color[colorKey];
          await colorPage.unselectColorByRGB(rgb);
        }

        await colorPage.waitForProductCountToChange(filteredCount);
        const countAfterUncheck = await colorPage.countProduct();
        expect(countAfterUncheck).toBe(initialCount);
      }
    });
  }
});