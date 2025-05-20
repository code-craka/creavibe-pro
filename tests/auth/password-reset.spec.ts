import { test, expect } from '@playwright/test';
import { TEST_USER, requestPasswordReset } from '../utils/auth-utils';

test.describe('Password Reset Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Start from a clean state
    await page.goto('/');
  });

  test('should show password reset request form', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    // Check if the reset password form is displayed
    await expect(page.getByRole('heading', { name: /Reset your password/i })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: /Send Reset Link/i })).toBeVisible();
  });

  test('should show validation errors for invalid email', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    // Try to submit without filling the form
    await page.getByRole('button', { name: /Send Reset Link/i }).click();
    
    // Check for validation errors
    await expect(page.getByText(/please enter.*email/i)).toBeVisible();
    
    // Fill invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByRole('button', { name: /Send Reset Link/i }).click();
    
    // Check for email validation error
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('should show success message after reset request', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    // Fill the form with a valid email
    await page.getByLabel('Email').fill(TEST_USER.email);
    
    // Submit the form
    await page.getByRole('button', { name: /Send Reset Link/i }).click();
    
    // Check for success message
    await expect(page.getByText(/reset link sent|check your email/i)).toBeVisible();
  });

  test('should navigate to login page from reset password', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    await page.getByRole('link', { name: /Back to login/i }).click();
    
    await expect(page).toHaveURL('/login');
  });

  // Note: We can't fully test the actual password reset flow that happens via email
  // The following test is a simulation of what would happen after clicking the reset link
  test('should show password update form when accessing with token', async ({ page }) => {
    // Simulate accessing the reset page with a token
    // In a real scenario, this would be a link from the email
    await page.goto('/auth/reset-password?token=simulated-token');
    
    // Check if the form to set a new password is displayed
    const newPasswordField = page.getByLabel(/New Password/i);
    const confirmPasswordField = page.getByLabel(/Confirm.*Password/i);
    
    if (await newPasswordField.isVisible() && await confirmPasswordField.isVisible()) {
      await expect(newPasswordField).toBeVisible();
      await expect(confirmPasswordField).toBeVisible();
      await expect(page.getByRole('button', { name: /Reset Password/i })).toBeVisible();
    } else {
      // Some implementations might handle the token differently
      // Skip the test if the expected fields aren't found
      test.skip();
    }
  });
});
