import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class ColorsPage extends BasePage {
  clickSanphamPage = "text=Sản Phẩm";
  productItems = ".card";
  colorInput = "input.round-checkbox";

  constructor(page: Page) {
    super(page);
  }
  async gotoSanPhamPage() {
    await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
    await this.page.click(this.clickSanphamPage);
  }
  getColorInputByRGB = (rgb: string) => `form.color-code[style*="${rgb}"] >> xpath=preceding-sibling::input`;
  async selectColorByRGB(rgb: string) {
    await this.page.locator(this.getColorInputByRGB(rgb)).check();
  }
  async unselectColorByRGB(rgb: string) {
    await this.page.locator(this.getColorInputByRGB(rgb)).uncheck();
  }

  async countProduct() {
    return await this.page.locator(this.productItems).count();
  }
  async waitForProductCountToChange(previousCount: number) {
    await this.page.waitForFunction(
      ({ selector, prevCount }) => {
        const currentCount = document.querySelectorAll(selector).length;
        return currentCount !== prevCount;
      },
      { selector: this.productItems, prevCount: previousCount }
    );
  }
}