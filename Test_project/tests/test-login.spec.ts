import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { LoginData, LoginTestCase } from "../data/login-data";

test.describe("Kiểm thử chức năng Đăng nhập", () => {
  LoginData.forEach((testCase: LoginTestCase) => {
    test(`${testCase.id} - ${testCase.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigateToHome();
      await loginPage.openLoginPageFromDropdown();

      if (testCase.id === 'LOGIN01') {
        // ✅ Kiểm tra hiển thị trang đăng nhập
        await expect(loginPage.loginContainer).toBeVisible({ timeout: 5000 });
      } else {
        await loginPage.Login(testCase.email, testCase.password);

        if (testCase.expected === 'Đăng nhập thành công') {
          const toast = page.locator('.Toastify__toast--success', {
            hasText: 'Đăng nhập thành công'
          });
          await toast.waitFor({ state: 'visible', timeout: 10000 });
          await expect(toast).toBeVisible();
        } else if (testCase.expected) {
          await expect(page.getByText(testCase.expected)).toBeVisible({ timeout: 5000 });
        }
      }

      await page.close();
    });
  });
});