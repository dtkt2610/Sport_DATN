import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./base-page";


export class SanphamPage extends BasePage {

  cssProductItems = ".card"; // Use the same selector as in your selectors object

  clickSanphamPage = "text=Sản Phẩm";
  searchInput = "input[id='searchInput']";
  productItems = ".card";
  productPrice = ".card-text span";
  messageText = ".text-error";


  constructor(page: Page) {
    super(page);
  }
  async gotoSanPhamPage() {
    await this.page.waitForSelector(this.clickSanphamPage, { state: "visible" });
    await this.page.click(this.clickSanphamPage);
    await this.page.waitForSelector(this.searchInput, { state: "visible" });
  }

  //Search Keyword
  async searchProduct(keyword: string) {
    // Chặn và ghi log các yêu cầu API
    await this.page.route("**/api/**", (route) => {
      console.log("API request:", route.request().url());
      route.continue();
    });


    await this.page.locator(this.searchInput).fill(keyword);
    console.log(`Entered keyword: ${keyword}`);
    await this.page.locator(this.searchInput).press("Enter");

    await this.page.screenshot({ path: `screenshot-after-enter-${keyword}.png` });

    // Đợi kết quả tìm kiếm hiển thị
    await this.page.waitForSelector(`${this.productItems} .card-title.h5`, {
      state: "visible",
      timeout: 10000,
    });
    await this.page.screenshot({ path: `screenshot-results-${keyword}.png` });
  }

  async verifyResultsContainKeyword(keyword: string) {
    const items = this.page.locator(this.productItems);
    const count = await items.count();
    console.log(`Found ${count} items`);

    if (await this.page.locator(this.messageText).isVisible()) {
      const messageText = await this.page.locator(this.messageText).innerText();
      console.log(`Message shown: ${messageText}`);
      expect(messageText.toLowerCase()).toContain("không có sản phẩm nào phù hợp");
      return;
    }

    expect(count).toBeGreaterThan(0); // Đảm bảo có sản phẩm hiển thị

    let hasMatchingProduct = false;
    for (let i = 0; i < count; i++) {
      const title = await items.nth(i).locator(".card-title.h5").innerText();
      console.log(`Item ${i + 1} title: ${title}`);
      if (title.toLowerCase().includes(keyword.toLowerCase())) {
        hasMatchingProduct = true;
        break;
      }
    }
    expect(hasMatchingProduct).toBe(true); // Đảm bảo ít nhất một sản phẩm khớp
  }
}
