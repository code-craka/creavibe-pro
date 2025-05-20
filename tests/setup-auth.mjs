import { test, expect } from '@playwright/test';
import { TEST_USER } from './utils/auth-utils';

// Set up test user before all tests
test.beforeAll(async ({ page }) => {
  console.log('Setting up test user for authentication tests...');
  
  // Navigate to signup page
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  
  // Fill out signup form
  await page.getByLabel('Email').fill(TEST_USER.email);
  await page.getByLabel('Password').fill(TEST_USER.password);
  await page.getByLabel('Confirm Password').fill(TEST_USER.password);
  
  // Submit form
  await page.getByRole('button', { name: /Sign Up/i }).click();
  
  // Wait for success
  await page.waitForURL('/dashboard');
  
  console.log('Test user setup complete!');
});

test('Verify test user setup', async ({ page }) => {
  // Verify user is logged in
  await expect(page).toHaveURL('/dashboard');
  
  // Take a screenshot for verification
  await page.screenshot({ path: 'test-user-setup.png' });
  console.log('Screenshot saved as test-user-setup.png');
});
