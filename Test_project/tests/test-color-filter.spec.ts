import { expect, test } from "@playwright/test";
import { ColorsPage } from "../pages/colors-page";
import { Color, ColorData, ColorTestCase } from "../utils/color-data";

test.describe("Lọc sản phẩm theo màu sắc", () => {
  for (const testCase of ColorData) {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
  const colorPage = new ColorsPage(page);

  await colorPage.navigateToHome();
  await colorPage.gotoSanPhamPage();

  let previousCount = await colorPage.countProduct();

  for (const colorKey of testCase.color) {
    const rgb = Color[colorKey];
    if (!rgb) throw new Error(`Không tìm thấy RGB cho màu: ${colorKey}`);

    await colorPage.selectColorByRGB(rgb);

    const checkbox = page.locator(colorPage.getColorInputByRGB(rgb));
    await expect(checkbox).toBeChecked();

    await colorPage.waitForProductCountToChange(previousCount);
    const currentCount = await colorPage.countProduct();

    // Kiểm tra có thay đổi
    expect(currentCount).not.toBe(previousCount);

    previousCount = currentCount;
  }

  // Nếu có yêu cầu bỏ lọc
  if (testCase.shouldUncheck === true) {
    for (const colorKey of testCase.color) {
      const rgb = Color[colorKey];
      await colorPage.unselectColorByRGB(rgb);

      const checkbox = page.locator(colorPage.getColorInputByRGB(rgb));
      await expect(checkbox).not.toBeChecked();

      await colorPage.waitForProductCountToChange(previousCount);
      const currentCount = await colorPage.countProduct();

      expect(currentCount).not.toBe(previousCount);

      previousCount = currentCount;
    }
  }
});

  }
});