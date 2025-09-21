import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './test',
  timeout: 120000,
  workers: 1,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://www.rentalcover.com/en',
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure',
  },
  outputDir: 'test-results/',
  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};

export default config;