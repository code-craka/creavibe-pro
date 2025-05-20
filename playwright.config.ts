import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run tests sequentially to avoid resource contention
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Add one retry for local runs
  workers: 1, // Limit to one worker to avoid resource contention
  reporter: 'html',
  timeout: 60000, // Increase global timeout to 60 seconds
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on-first-retry',
    navigationTimeout: 45000, // Increase navigation timeout
    actionTimeout: 30000, // Increase action timeout
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
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    port: 3001,
    reuseExistingServer: !process.env.CI,
  },
});
