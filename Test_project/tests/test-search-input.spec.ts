import { test } from '@playwright/test';
import { SanphamPage } from '../pages/sanpham-page';
import { sanphamSearchData } from '../utils/search-input-data';

test.describe('Kiểm thử chức năng tìm kiếm sản phẩm', () => {
    sanphamSearchData.forEach(({ id, description, keyword})=>{
        test(`${id} - ${description}`, async ({ page }) => {
            const sanphamPage = new SanphamPage(page);
            await sanphamPage.navigateToHome();
            await sanphamPage.gotoSanPhamPage();
            await sanphamPage.searchProduct(keyword);
            await sanphamPage.verifyResultsContainKeyword(keyword);

            await page.close();
        });
    }); 
});
