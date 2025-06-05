import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductDetailPage } from "../pages/product-details-page";
import { CartPage } from "../pages/cart-page";
import { CartTestData } from "../utils/cart-data";
import { colorMap } from "../shared/constants";
import { validUser } from "../utils/login-data";

test.describe("Cart Functionality Tests", () => {
    for (const tc of CartTestData) {
        test(`${tc.id} - ${tc.description}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const cartPage = new CartPage(page);
            const productDetailPage = new ProductDetailPage(page);

            // 1. Đăng nhập
            await loginPage.navigateToHome();
            await loginPage.openLoginPageFromDropdown();
            await loginPage.Login(validUser.email, validUser.password);

            // 2. Thêm sản phẩm vào giỏ
            if (tc.initialCartItems?.length) {
                for (const item of tc.initialCartItems) {
                    await productDetailPage.gotoSanPhamPage();
                    await productDetailPage.clickProductByName(item.productName);
                    await productDetailPage.selectColorByName(item.colorRgb);
                    await productDetailPage.selectSizeByName(item.size);
                    await productDetailPage.setQuantity(item.quantity);
                    await productDetailPage.addToCart();
                }
            }

            // 3. Mở trang giỏ hàng
            await cartPage.gotoCartPage();

            // 4. Kiểm tra sản phẩm mong đợi
            if (tc.expectedProducts?.length) {
                for (const expected of tc.expectedProducts) {
                    await cartPage.expectItemInCart({
                        productName: expected.productName,
                        size: expected.size,
                        colorRgb: colorMap[expected.colorRgb],
                        quantity: expected.quantity,
                    });
                }
            }

            // 5. Thực hiện các hành động
            if (tc.actions?.length) {
                for (const action of tc.actions) {
                    const mappedColor = action.colorRgb ? colorMap[action.colorRgb] : undefined;

                    switch (action.type) {
                        case "updateQuantity":
                            await cartPage.updateQuantity({
                                productName: action.productName!,
                                size: action.size!,
                                colorRgb: mappedColor!,
                                quantity: action.quantity!
                            });
                            break;

                        case "deleteProduct":
                            await cartPage.deleteItem({
                                productName: action.productName!,
                                size: action.size!,
                                colorRgb: mappedColor!
                            });
                            break;

                        case "selectForCheckout":
                            await cartPage.selectItem({
                                productName: action.productName!,
                                size: action.size!,
                                colorRgb: mappedColor!
                            });
                            break;

                        case "proceedToCheckout":
                            await cartPage.clickProceedToCheckout();
                            break;
                    }
                }
            }

            // 6. Kiểm tra giỏ hàng trống
            if (tc.expectText === "Không có sản phẩm nào trong giỏ hàng") {
                await cartPage.expectEmptyCart();
            }

            // 7. Kiểm tra thông báo lỗi (toast)
            if (tc.expectError && tc.expectText) {
                await cartPage.expectErrorMessage(tc.expectText);
            }

            // 8. Điều hướng nếu thanh toán thành công
            if (tc.actions?.some(a => a.type === "proceedToCheckout") && !tc.expectError) {
                await expect(page).toHaveURL(/\/checkout\/[a-f0-9-]+$/);
            }
        });
    }
});
