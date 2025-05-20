import { test, expect } from '@playwright/test';
import { TEST_USER } from './utils/auth-utils';

// Test suite for setting up test user
test.describe('Test User Setup', () => {
  test('should create test user account', async ({ browser }) => {
    console.log('Setting up test user for authentication tests...');
    
    // Create new context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Navigate to signup page
      await page.goto('/signup');
      await page.waitForLoadState('networkidle');
      
      // Fill out signup form
      await page.getByLabel('Full Name').fill('Test User');
      await page.getByLabel('Email').fill(TEST_USER.email);
      await page.locator('input[name="password"]').fill(TEST_USER.password);
      await page.getByLabel('Confirm Password').fill(TEST_USER.password);
      
      // Submit form with the correct button text
      await page.getByRole('button', { name: 'Create Account' }).click();
      
      // Wait for any response (success or error)
      await page.waitForLoadState('networkidle');
      
      // Check if there are any error messages
      const errorMessages = await page.$$('text=error');
      if (errorMessages.length > 0) {
        console.log('Found error messages on the page:');
        for (const error of errorMessages) {
          const errorText = await error.textContent();
          console.log(`Error: ${errorText}`);
        }
        
        // The user might already exist, try logging in instead
        console.log('Attempting to log in with the same credentials...');
        await page.goto('/login');
        await page.waitForLoadState('networkidle');
        
        await page.getByLabel('Email').fill(TEST_USER.email);
        await page.locator('input[name="password"]').fill(TEST_USER.password);
        await page.getByRole('button', { name: 'Sign In' }).click();
      }
      
      // Wait for dashboard with a longer timeout
      try {
        await page.waitForURL('/dashboard', { timeout: 60000 });
        console.log('Successfully navigated to dashboard');
        
        // Verify user is logged in
        await expect(page).toHaveURL('/dashboard');
      } catch (error) {
        console.log('Failed to navigate to dashboard, current URL:', page.url());
        // Take a screenshot of the current page for debugging
        await page.screenshot({ path: 'navigation-error.png' });
        throw error;
      }
      
      // Take a screenshot for verification
      await page.screenshot({ path: 'test-user-setup.png' });
      console.log('Screenshot saved as test-user-setup.png');
      
      console.log('Test user setup complete!');
    } finally {
      // Clean up
      await context.close();
    }
  });
});
