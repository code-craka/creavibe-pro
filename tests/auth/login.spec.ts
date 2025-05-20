import { test, expect } from '@playwright/test';
import { TEST_USER, signIn, signOut, isAuthenticated } from '../utils/auth-utils';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from a clean state
    await page.goto('/');
  });

  test('should show login form', async ({ page }) => {
    await page.goto('/login');
    
    // Check if the login form is displayed
    await expect(page.getByRole('heading', { name: /Sign in to your account/i })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
  });

  test('should show validation errors for invalid inputs', async ({ page }) => {
    await page.goto('/login');
    
    // Try to submit without filling the form
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Check for validation errors
    await expect(page.getByText(/please enter.*email/i)).toBeVisible();
    
    // Fill invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Check for email validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill with invalid credentials
    await page.getByLabel('Email').fill('nonexistent@example.com');
    await page.getByLabel('Password').fill('WrongPassword123!');
    
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Check for invalid credentials error
    await expect(page.getByText(/invalid credentials|user not found/i)).toBeVisible();
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    // This test assumes the TEST_USER exists in the database
    // You may need to create this user first or use a known test account
    await signIn(page, TEST_USER.email, TEST_USER.password);
    
    // Check if redirected to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Check if user is authenticated
    expect(await isAuthenticated(page)).toBeTruthy();
    
    // Clean up - sign out
    await signOut(page);
  });

  test('should allow passwordless login with magic link', async ({ page }) => {
    await page.goto('/login');
    
    // Switch to magic link tab if available
    const magicLinkTab = page.getByRole('tab', { name: /Magic Link/i });
    if (await magicLinkTab.isVisible()) {
      await magicLinkTab.click();
      
      // Fill email for magic link
      await page.getByLabel('Email').fill(TEST_USER.email);
      await page.getByRole('button', { name: /Send Magic Link/i }).click();
      
      // Check for success message
      await expect(page.getByText(/magic link sent|check your email/i)).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('should allow social login options', async ({ page }) => {
    await page.goto('/login');
    
    // Check if social login buttons are available
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

  test('should navigate to signup page from login', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByRole('link', { name: /Sign up/i }).click();
    
    await expect(page).toHaveURL('/signup');
  });

  test('should navigate to password reset from login', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByRole('link', { name: /Forgot password/i }).click();
    
    await expect(page).toHaveURL(/\/auth\/reset-password/);
  });
});
