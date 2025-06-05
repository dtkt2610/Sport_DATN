import { expect, test } from "@playwright/test";
import { MaterialPage } from "../pages/material-page";
import { MaterialData, MaterialFilterTestCase } from "../utils/material-data";

test.describe("Lọc sản phẩm theo chất liệu", () => {
    for (const testCase of MaterialData) {
        test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {

            const materialPage = new MaterialPage(page);

            await materialPage.navigateToHome();
            await materialPage.gotoSanPhamPage();

            const initialCount = await materialPage.getVisibleProductCount();

            // 👉 Bước 1: Chọn chất liệu ban đầu
            await materialPage.selectCollars(...testCase.initialSelection);
            await materialPage.waitForProductCountToChange(initialCount);

            const afterFirstSelectionCount = await materialPage.getVisibleProductCount();
            expect(afterFirstSelectionCount).toBeGreaterThanOrEqual(0); // ít nhất vẫn nên kiểm

            // 👉 Bước 2: Nếu có unselect và chọn lại chất liệu khác
            if (testCase.unselectAfter && testCase.reselect) {
                await materialPage.unselectCollars(...testCase.initialSelection);
                const countAfterUnselect = await materialPage.getVisibleProductCount();

                await materialPage.selectCollars(...testCase.reselect);
                await materialPage.waitForProductCountToChange(countAfterUnselect);

                const finalCount = await materialPage.getVisibleProductCount();
                expect(finalCount).toBeGreaterThanOrEqual(0);
            }
        });
    }
    test.afterAll(async ({ page }) => {
        page.close();
    });
});
