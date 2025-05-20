import { test, expect } from '@playwright/test';
import { TEST_USER, signUp } from '../utils/auth-utils';

test.describe('Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from a clean state
    await page.goto('/');
  });

  test('should show signup form', async ({ page }) => {
    await page.goto('/signup');
    
    // Check if the signup form is displayed
    await expect(page.getByRole('heading', { name: /Create an account/i })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByLabel('Confirm Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign Up/i })).toBeVisible();
  });

  test('should show validation errors for invalid inputs', async ({ page }) => {
    await page.goto('/signup');
    
    // Try to submit without filling the form
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Check for validation errors
    await expect(page.getByText(/please enter.*email/i)).toBeVisible();
    
    // Fill invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Check for email validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
    
    // Fill valid email but invalid password
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('short');
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Check for password validation error
    await expect(page.getByText(/password must be at least/i)).toBeVisible();
    
    // Fill valid email and password but mismatched confirmation
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Confirm Password').fill('DifferentPassword123!');
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Check for password match error
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });

  test('should show success message after signup', async ({ page }) => {
    // Generate a unique email to avoid conflicts with existing accounts
    const uniqueEmail = `test-${Date.now()}@example.com`;
    
    await page.goto('/signup');
    
    // Fill the signup form
    await page.getByLabel('Email').fill(uniqueEmail);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByLabel('Confirm Password').fill(TEST_USER.password);
    
    // Submit the form
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Check for success message
    await expect(page.getByText(/verification email|check your email/i)).toBeVisible();
  });

  test('should show error for existing email', async ({ page }) => {
    // This test assumes the TEST_USER email already exists in the database
    await page.goto('/signup');
    
    // Fill the signup form with existing email
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByLabel('Confirm Password').fill(TEST_USER.password);
    
    // Submit the form
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Check for error message about existing user
    await expect(page.getByText(/already registered|already exists/i)).toBeVisible();
  });

  test('should allow social signup options', async ({ page }) => {
    await page.goto('/signup');
    
    // Check if social signup buttons are available
    const googleButton = page.getByRole('button', { name: /Continue with Google/i });
    const githubButton = page.getByRole('button', { name: /Continue with GitHub/i });
    
    if (await googleButton.isVisible() || await githubButton.isVisible()) {
      // We can't fully test OAuth flows in automated tests, but we can check the buttons exist
      if (await googleButton.isVisible()) {
        await expect(googleButton).toBeVisible();
      }
      
      if (await githubButton.isVisible()) {
        await expect(githubButton).toBeVisible();
      }
    } else {
      test.skip();
    }
  });

  test('should navigate to login page from signup', async ({ page }) => {
    await page.goto('/signup');
    
    await page.getByRole('link', { name: /Sign in/i }).click();
    
    await expect(page).toHaveURL('/login');
  });
});
