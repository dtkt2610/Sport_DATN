import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./base-page";

export class PriceRangePage extends BasePage {
  clickSanphamPage = "text=Sản Phẩm";
  productItems = ".card";
  priceSliderMax = ".thumb.thumb-1[role='slider']";
  priceSliderMin = ".thumb.thumb-0[role='slider']";
  sliderContainer = ".slider";
  productPrice = ".card-text span";

  constructor(page: Page) {
    super(page);
  }

  async gotoSanPhamPage() {
    await this.page.waitForSelector(this.clickSanphamPage, { state: "visible", timeout: 10000 });
    await this.page.click(this.clickSanphamPage);
  }

  async setPriceRange(minPrice: number | { value: number }, maxPrice: number | { value: number }) {
    if (await this.page.isClosed()) {
        throw new Error("Trang đã bị đóng trước khi setPriceRange.");
    }

    // Open accordion if collapsed
    const accordion = this.page.locator('.accordion-body:has(.slider)');
    await expect(accordion).toBeVisible({ timeout: 10000 });
    const isCollapsed = await accordion.evaluate(el => el.classList.contains('collapse') && !el.classList.contains('show'));
    if (isCollapsed) {
        const accordionButton = this.page.locator('.accordion-button:has-text("Khoảng giá")');
        await accordionButton.click();
        await expect(accordion).toHaveClass(/show/, { timeout: 5000 });
    }

    // Log slider state
    const logSliderState = async () => {
        const maxSlider = this.page.locator(this.priceSliderMax);
        const minSlider = this.page.locator(this.priceSliderMin);
        const maxDisabled = await maxSlider.getAttribute('aria-disabled');
        const minDisabled = await minSlider.getAttribute('aria-disabled');
        console.log(`Min slider: disabled=${minDisabled}, HTML=${await minSlider.evaluate(el => el.outerHTML)}`);
        console.log(`Max slider: disabled=${maxDisabled}, HTML=${await maxSlider.evaluate(el => el.outerHTML)}`);
        const sliderHtml = await this.page.locator(this.sliderContainer).evaluate(el => el.outerHTML);
        console.log(`Slider HTML: ${sliderHtml}`);
    };
    await logSliderState();

    // Wait for slider initialization
    const maxSlider = this.page.locator(this.priceSliderMax);
    const minSlider = this.page.locator(this.priceSliderMin);
    await maxSlider.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForFunction(
        (selector: string) => {
            const element = document.querySelector(selector);
            return element && parseFloat(element.getAttribute('aria-valuemax') || '0') > 0;
        },
        this.priceSliderMax,
        { timeout: 15000 }
    ).catch(async () => {
        throw new Error("Thanh trượt chưa khởi tạo đúng.");
    });

    // Check if sliders are disabled
    const maxDisabled = await maxSlider.getAttribute('aria-disabled');
    const minDisabled = await minSlider.getAttribute('aria-disabled');
    if (maxDisabled === 'true' || minDisabled === 'true') {
        throw new Error(`Thanh trượt bị vô hiệu hóa: minDisabled=${minDisabled}, maxDisabled=${maxDisabled}`);
    }

    // Get max slider value
    const rawMaxValue = await maxSlider.getAttribute('aria-valuemax') ?? '1550000';
    let maxSliderValue = parseFloat(rawMaxValue);
    if (isNaN(maxSliderValue) || maxSliderValue <= 0) {
        console.warn(`Giá trị aria-valuemax không hợp lệ: ${rawMaxValue}. Sử dụng giá trị dự phòng: 1550000`);
        maxSliderValue = 1550000;
    }
    console.log(`maxSliderValue: ${maxSliderValue}`);

    // Normalize minPrice and maxPrice
    const min = typeof minPrice === 'object' && 'value' in minPrice ? minPrice.value : Number(minPrice);
    const max = typeof maxPrice === 'object' && 'value' in maxPrice ? maxPrice.value : Number(maxPrice);
    if (isNaN(min) || isNaN(max) || min < 0 || max < min || max > maxSliderValue) {
        throw new Error(`Giá trị giá không hợp lệ: minPrice=${minPrice}, maxPrice=${maxPrice}`);
    }
    console.log(`Trước khi kéo: min=${min}, max=${max}`);

    // Get slider container dimensions
    const slider = this.page.locator(this.sliderContainer);
    const sliderBox = await slider.boundingBox();
    if (!sliderBox) {
        throw new Error("Không thể lấy kích thước slider container");
    }
    const sliderWidth = sliderBox.width;
    if (isNaN(sliderWidth) || sliderWidth <= 0) {
        throw new Error(`Chiều rộng slider không hợp lệ: ${sliderWidth}`);
    }

    // Check initial slider values
    const minThumb = this.page.locator(this.priceSliderMin);
    const maxThumb = this.page.locator(this.priceSliderMax);
    const initialMinValue = parseFloat(await minThumb.getAttribute('aria-valuenow') || '0');
    const initialMaxValue = parseFloat(await maxThumb.getAttribute('aria-valuenow') || '0');
    console.log(`Trạng thái ban đầu: min=${initialMinValue}, max=${initialMaxValue}`);

    // If initial values match desired values, skip dragging
    if (Math.abs(initialMinValue - min) < 1000 && Math.abs(initialMaxValue - max) < 1000) {
        console.log(`Trạng thái ban đầu đã đúng: min=${initialMinValue}, max=${initialMaxValue}. Bỏ qua kéo thanh trượt.`);
    } else {
        // Calculate drag positions
        const minRatio = min / maxSliderValue;
        const maxRatio = max / maxSliderValue;
        const minPosition = Math.round(Math.max(0, minRatio * sliderWidth - 10000 ));
        const maxPosition = Math.round(Math.max(0, maxRatio * sliderWidth ));
        console.log(`minPosition=${minPosition}, maxPosition=${maxPosition}`);

        // Drag thumb function
        const performDrag = async (thumb: Locator, position: number) => {
            await thumb.waitFor({ state: 'visible', timeout: 5000 });
            await thumb.dragTo(slider, {
                targetPosition: { x: position, y: sliderBox.height / 2 },
                force: true
            });
            await this.page.waitForTimeout(1000); // Chờ UI cập nhật
            await thumb.evaluate(el => el.dispatchEvent(new Event('change')));
            const valueAfter = parseFloat(await thumb.getAttribute('aria-valuenow') || '0');
            console.log(`Giá trị sau khi kéo: ${valueAfter}, Vị trí mục tiêu: ${position}`);
            return valueAfter;
        };

        // Perform drag
        await performDrag(minThumb, minPosition); // Kéo min trước
        await this.page.waitForTimeout(500);
        await performDrag(maxThumb, maxPosition); // Kéo max sau
    }

    // Verify slider values
    await this.page.waitForTimeout(2000); // Chờ UI ổn định
    const minValueAfter = parseFloat(await minThumb.getAttribute('aria-valuenow') || '0');
    const maxValueAfter = parseFloat(await maxThumb.getAttribute('aria-valuenow') || '0');
    console.log(`Sau khi kiểm tra: minValueAfter=${minValueAfter}, maxValueAfter=${maxValueAfter}`);
    if (Math.abs(minValueAfter - min) > 1000 || Math.abs(maxValueAfter - max) > 1000) {
        throw new Error(`Thanh trượt không được đặt đúng: min=${minValueAfter}, max=${maxValueAfter}`);
    }

    // Wait for product list to update
    const initialCount = await this.page.locator(this.productItems).count();
    await Promise.race([
        await this.page.waitForFunction(
            ({ selector, initial }: { selector: string; initial: number }) => {
                const currentCount = document.querySelectorAll(selector).length;
                return currentCount !== initial;
            },
            { selector: this.productItems, initial: initialCount },
            { timeout: 10000 }
        ),
        this.page.waitForLoadState('networkidle', { timeout: 10000 })
    ]).catch(async () => {
        throw new Error('Danh sách sản phẩm không cập nhật sau khi kéo slider.');
    });

    // Ensure products are visible
    await this.page.locator(this.productItems).first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
        console.warn('Không có sản phẩm nào hiển thị, có thể danh sách rỗng.');
    });
}

  async verifyProductsInPriceRange(min: number, max: number, expectEmpty: boolean = false) {
    await this.page.waitForTimeout(2000); // Allow UI to stabilize
    const products = await this.page.locator(this.productItems).all();
    console.log(`Số sản phẩm tìm thấy: ${products.length}`);

    if (expectEmpty) {
      await expect(this.page.locator(this.productItems)).toHaveCount(0, { timeout: 5000 });
      return;
    }

    const validProducts: string[] = [];
    const invalidProducts: string[] = [];

    for (const [index, product] of products.entries()) {
      const priceText = await product.locator(this.productPrice).textContent();
      if (!priceText) {
        console.warn(`Product ${index + 1}: Không tìm thấy giá`);
        continue;
      }

      const price = parseFloat(priceText.replace(/[^0-9]/g, ''));
      console.log(`Product ${index + 1}: Raw price=${priceText}, Parsed price=${price}`);

      if (isNaN(price)) {
        console.warn(`Product ${index + 1}: Giá không hợp lệ: ${priceText}`);
        continue;
      }

      // Handle min = max case
      if (min === max) {
        if (price === min) {
          validProducts.push(`Product ${index + 1}: Price ${price} matches exact value`);
        } else {
          invalidProducts.push(`Product ${index + 1}: Price ${price} does not match ${min}`);
        }
      } else if (price >= min && price <= max) {
        validProducts.push(`Product ${index + 1}: Price ${price} is within range`);
      } else {
        invalidProducts.push(`Product ${index + 1}: Price ${price} is out of range`);
      }
    }

    console.log(`Sản phẩm hợp lệ: ${validProducts.join(', ')}`);
    if (invalidProducts.length > 0) {
      console.error(`Sản phẩm không hợp lệ: ${invalidProducts.join(', ')}`);
      throw new Error(`Tìm thấy sản phẩm ngoài khoảng giá: ${invalidProducts.join(', ')}`);
    }

    if (validProducts.length === 0 && !expectEmpty) {
      throw new Error(`Không tìm thấy sản phẩm nào trong khoảng giá ${min} - ${max}`);
    }
  }
}