import { test, expect } from "@playwright/test";
import { ProductDetailPage } from "../pages/product-details-page";
import { AddToCartData } from "../utils/add-to-card-data";
import { LoginPage } from "../pages/login-page";
import { validUser } from "../utils/login-data";

test.describe('Thêm vào giỏ hàng', () => {
  for (const tc of AddToCartData) {
    test(tc.id + ' - ' + tc.description, async ({ page }) => {
      const productDetailPage = new ProductDetailPage(page);
      await productDetailPage.navigateToHome(); // URL trang chủ

      // Đăng nhập nếu không mong đợi redirect đến login
      if (!tc.expectRedirectToLogin) {
        const loginPage = new LoginPage(page);
        await loginPage.openLoginPageFromDropdown();
        await loginPage.Login(validUser.email, validUser.password);

        const toast = page.locator('.Toastify__toast--success', {
          hasText: 'Đăng nhập thành công',
        });
        await toast.waitFor({ state: 'visible', timeout: 10000 });
        await expect(toast).toBeVisible();
      }
      await productDetailPage.clearAllCartItems();

      await productDetailPage.gotoSanPhamPage();
      await productDetailPage.clickProductByName(tc.productName!);

      if (tc.colorRgb) {
        await productDetailPage.selectColorByName(tc.colorRgb);
      }

      if (tc.sizeLabel) {
        await productDetailPage.selectSizeByName(tc.sizeLabel);
      }

      await productDetailPage.setQuantity(tc.quantity ?? 1);

      const badgeLocator = page.locator(productDetailPage.cartBadge);
      const oldBadgeText = (await badgeLocator.textContent()) || '0';
      const oldCount = parseInt(oldBadgeText) || 0;

      await productDetailPage.addToCart();

      if (tc.expectRedirectToLogin) {
        await expect(page).toHaveURL("http://localhost:3000/login");
      } else {
        const toast = page.locator('.Toastify__toast-body');
        await expect(toast).toContainText(tc.expectedPopupMessage!);

        if (tc.expectedPopupMessage?.toLowerCase().includes('Thành công')) {
          await expect(badgeLocator).toHaveText(
            (oldCount + (tc.quantity ?? 1)).toString(),
            { timeout: 5000 }
          );
        }
      }

    });
  }
});
