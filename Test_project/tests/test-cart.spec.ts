import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductDetailPage } from "../pages/product-details-page";
import { CartPage } from "../pages/cart-page";
import { CartTestData } from "../utils/cart-data";
import { colorMap } from "../shared/constants";
import { validUser } from "../utils/login-data";

test.describe("Kiểm tra giỏ hàng", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToHome();
        await loginPage.openLoginPageFromDropdown();
        await loginPage.Login(validUser.email, validUser.password);
    });

    for (const tc of CartTestData) {
        test(`${tc.id} - ${tc.description}`, async ({ page }) => {
            const cartPage = new CartPage(page);
            const productDetailPage = new ProductDetailPage(page);

            try {
                // ✅ Nếu không có sản phẩm và cần kiểm tra giỏ hàng rỗng
                if (!tc.initialCartItems?.length && tc.expectText === "Không có sản phẩm nào trong giỏ hàng") {
                    await cartPage.gotoCartPage();
                    await productDetailPage.clearAllCartItems();
                    await cartPage.expectEmptyCart();
                    return;
                }

                // ✅ Thêm sản phẩm ban đầu vào giỏ
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

                // ✅ Mở trang giỏ hàng
                await cartPage.gotoCartPage();

                // ✅ Thực hiện các hành động
                if (tc.actions?.length) {
                    for (const action of tc.actions) {
                        const mappedColor = action.colorRgb ? colorMap[action.colorRgb] : undefined;
                        if (action.colorRgb && !mappedColor) throw new Error(`Màu ${action.colorRgb} không được ánh xạ`);

                        switch (action.type) {
                            case "updateQuantity":
                                await cartPage.updateQuantity({
                                    productName: action.productName!,
                                    size: action.size!,
                                    colorRgb: mappedColor!,
                                    quantity: action.quantity!
                                });

                                // ✅ Kiểm tra sau khi update
                                await cartPage.expectItemInCart({
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

                // ✅ Kiểm tra giỏ hàng rỗng sau hành động xóa
                if (tc.expectText === "Không có sản phẩm nào trong giỏ hàng") {
                    await cartPage.expectEmptyCart();
                }

                // ✅ Kiểm tra lỗi nếu có
                if (tc.expectError && tc.expectText) {
                    await cartPage.expectErrorMessage(tc.expectText);
                }

                // ✅ Kiểm tra điều hướng đến trang checkout
                if (tc.actions?.some(a => a.type === "proceedToCheckout") && !tc.expectError) {
                    await expect(page).toHaveURL(/\/checkout\/[a-f0-9-]+$/);

                    if (tc.checkoutSelection?.length) {
                        for (const selected of tc.checkoutSelection) {
                            await expect(page.locator(`text=${selected.productName}`)).toBeVisible();
                        }
                    }
                }

                // ✅ Kiểm tra các sản phẩm còn lại sau cùng (nếu được khai báo)
                if (tc.expectedProducts?.length) {
                    for (const expected of tc.expectedProducts) {
                        const mappedColor = colorMap[expected.colorRgb];
                        if (!mappedColor) throw new Error(`Màu ${expected.colorRgb} không được ánh xạ`);
                        await cartPage.expectItemInCart({
                            productName: expected.productName,
                            size: expected.size,
                            colorRgb: mappedColor,
                            quantity: expected.quantity,
                        });
                    }
                }

            } catch (e) {
                console.error(`❌ Test case ${tc.id} bị lỗi:`, e);
                throw e;
            }
        });
    }
});
