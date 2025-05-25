import { expect, test } from "@playwright/test";
import { LoginPage} from "../pages/login-page";
import { invalidUser, validUser } from "../utils/login-data"; 

test.describe("Kiểm thử đăng nhập", () => {
  test("Đăng nhập thành công", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
    await loginPage.openLoginPageFromDropdown();
    await loginPage.Login(validUser.email, validUser.password);
    const toast = page.locator('.Toastify__toast--success', { hasText: 'Đăng nhập thành công' });
    await toast.waitFor({ state: 'visible', timeout: 10000 });
    await expect(toast).toBeVisible();

    await page.close();
  });

  test("Đăng nhập thất bại", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
    await loginPage.openLoginPageFromDropdown();
    await loginPage.Login(invalidUser.email, invalidUser.password);
    await expect(page.getByText("Sai tài khoản hoặc mật khẩu")).toBeVisible({ timeout: 5000 });
    await page.close();
  });
});
