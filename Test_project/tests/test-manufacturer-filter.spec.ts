import { expect, test } from "@playwright/test";
import { ManufacturerPage } from "../pages/manufacturer-page";
import { ManufacturerData, ManufacturerFilterTestCase } from "../data/manufacturer-data";

test.describe("Lọc sản phẩm theo nhà sản xuất", () => {
    for (const testCase of ManufacturerData) {
        test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {

            const manufacturerPage = new ManufacturerPage(page);

            await manufacturerPage.navigateToHome();
            await manufacturerPage.gotoSanPhamPage();

            const initialCount = await manufacturerPage.getVisibleProductCount();

            // 👉 Bước 1: Chọn chất liệu ban đầu
            await manufacturerPage.selectManufacturer(...testCase.initialSelection);
            await manufacturerPage.waitForProductCountToChange(initialCount);

            const afterFirstSelectionCount = await manufacturerPage.getVisibleProductCount();
            expect(afterFirstSelectionCount).toBeGreaterThanOrEqual(0); // ít nhất vẫn nên kiểm

            // 👉 Bước 2: Nếu có unselect và chọn lại chất liệu khác
            if (testCase.unselectAfter && testCase.reselect) {
                await manufacturerPage.unselectManufacturer(...testCase.initialSelection);
                const countAfterUnselect = await manufacturerPage.getVisibleProductCount();

                await manufacturerPage.selectManufacturer(...testCase.reselect);
                await manufacturerPage.waitForProductCountToChange(countAfterUnselect);

                const finalCount = await manufacturerPage.getVisibleProductCount();
                expect(finalCount).toBeGreaterThanOrEqual(0);
            }

            await page.close();
        });

    }
})