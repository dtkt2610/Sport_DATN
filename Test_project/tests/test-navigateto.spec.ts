// tests/home-navigation.spec.ts
import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base-page';

test.describe('Chuyển hướng trang chủ', () => {
  test('navigateToHome() nên chuyển hướng đúng URL', async ({ page }) => {
    const basePage = new BasePage(page);
    
    await basePage.navigateToHome();
    await basePage.waitForPageLoad();

    // Kiểm tra URL hiện tại sau khi chuyển hướng
    await expect(page).toHaveURL(/\/trang-chu$/); // Có thể chỉnh sửa biểu thức tùy vào URL thực tế
    await page.close();
  });
});
