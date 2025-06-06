import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // ✅ Cấu hình reporter HTML phù hợp cho CI
  reporter: [
    ['html', {
      outputFolder: 'test-reports',
      open: process.env.CI ? 'never' : 'always'  // ❗ Không mở khi chạy trên GitHub Actions
    }]
  ],

  use: {
    launchOptions: {
      slowMo: 500,
    },
    trace: 'on-first-retry',        // ✅ Ghi trace khi lỗi
    screenshot: 'only-on-failure',  // ✅ Chụp ảnh khi test fail
    video: 'retain-on-failure',     // ✅ Ghi video khi test fail
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
