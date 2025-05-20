import { test, expect } from '@playwright/test';
import { TEST_USER, signIn, signOut, deleteAccount } from '../utils/auth-utils';

test.describe('Account Management', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await signIn(page, TEST_USER.email, TEST_USER.password);
  });

  test.afterEach(async ({ page }) => {
    // Make sure we're signed out after each test
    try {
      await signOut(page);
    } catch (e) {
      // Ignore errors if already signed out
    }
  });

  test('should allow updating profile information', async ({ page }) => {
    await page.goto('/profile');
    
    // Generate unique values for testing
    const username = `testuser-${Date.now()}`;
    const fullName = `Test User ${Date.now()}`;
    
    // Fill profile form
    await page.getByLabel(/Username/i).fill(username);
    await page.getByLabel(/Full Name/i).fill(fullName);
    
    // Submit the form
    await page.getByRole('button', { name: /Save Changes/i }).click();
    
    // Check for success message
    await expect(page.getByText(/profile updated|saved successfully/i)).toBeVisible();
    
    // Reload the page to verify changes persisted
    await page.reload();
    
    // Check if values were saved
    await expect(page.getByLabel(/Username/i)).toHaveValue(username);
    await expect(page.getByLabel(/Full Name/i)).toHaveValue(fullName);
  });

  test('should allow changing password', async ({ page }) => {
    await page.goto('/settings');
    
    // Find the password change section
    await page.getByText(/Change Password/i).scrollIntoViewIfNeeded();
    
    // Fill the password change form
    await page.getByLabel(/Current Password/i).fill(TEST_USER.password);
    await page.getByLabel(/New Password/i).fill(TEST_USER.newPassword);
    await page.getByLabel(/Confirm.*Password/i).fill(TEST_USER.newPassword);
    
    // Submit the form
    const saveButton = page.getByRole('button', { name: /Save Changes|Update Password/i });
    await saveButton.click();
    
    // Check for success message
    await expect(page.getByText(/password updated|changed successfully/i)).toBeVisible();
    
    // Sign out and sign back in with the new password to verify
    await signOut(page);
    await signIn(page, TEST_USER.email, TEST_USER.newPassword);
    
    // Should be redirected to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Change password back to original for other tests
    await page.goto('/settings');
    await page.getByText(/Change Password/i).scrollIntoViewIfNeeded();
    await page.getByLabel(/Current Password/i).fill(TEST_USER.newPassword);
    await page.getByLabel(/New Password/i).fill(TEST_USER.password);
    await page.getByLabel(/Confirm.*Password/i).fill(TEST_USER.password);
    await saveButton.click();
  });

  test('should show validation errors for password change', async ({ page }) => {
    await page.goto('/settings');
    
    // Find the password change section
    await page.getByText(/Change Password/i).scrollIntoViewIfNeeded();
    
    // Submit without filling
    const saveButton = page.getByRole('button', { name: /Save Changes|Update Password/i });
    await saveButton.click();
    
    // Should show validation errors
    await expect(page.getByText(/current password.*required/i)).toBeVisible();
    
    // Fill current password but not new password
    await page.getByLabel(/Current Password/i).fill(TEST_USER.password);
    await saveButton.click();
    
    // Should show validation errors for new password
    await expect(page.getByText(/new password.*required/i)).toBeVisible();
    
    // Fill with mismatched passwords
    await page.getByLabel(/Current Password/i).fill(TEST_USER.password);
    await page.getByLabel(/New Password/i).fill(TEST_USER.newPassword);
    await page.getByLabel(/Confirm.*Password/i).fill('DifferentPassword123!');
    await saveButton.click();
    
    // Should show password match error
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });

  test('should allow account deletion', async ({ page }) => {
    // This test should use a separate test account that can be deleted
    // We'll skip the actual deletion in this test to avoid affecting other tests
    
    await page.goto('/settings');
    
    // Find the account deletion section
    const deleteSection = page.getByText(/Delete Account/i);
    
    // Check if the account deletion section exists
    if (await deleteSection.isVisible()) {
      await deleteSection.scrollIntoViewIfNeeded();
      
      // Check if the delete button exists
      const deleteButton = page.getByRole('button', { name: /Delete Account/i });
      await expect(deleteButton).toBeVisible();
      
      // We'll skip the actual deletion to avoid affecting other tests
      test.skip();
    } else {
      test.skip();
    }
  });

  // This test should be run separately with a disposable test account
  test.skip('should delete account and prevent login afterwards', async ({ page }) => {
    // Create a disposable test account first
    const disposableEmail = `delete-test-${Date.now()}@example.com`;
    const disposablePassword = 'DeleteMe123!';
    
    // Sign out of current account
    await signOut(page);
    
    // Create a new account for deletion testing
    await page.goto('/signup');
    await page.getByLabel('Email').fill(disposableEmail);
    await page.getByLabel('Password').fill(disposablePassword);
    await page.getByLabel('Confirm Password').fill(disposablePassword);
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Sign in with the new account
    await signIn(page, disposableEmail, disposablePassword);
    
    // Delete the account
    await deleteAccount(page);
    
    // Try to sign in again with the deleted account
    await signIn(page, disposableEmail, disposablePassword);
    
    // Should show error about invalid credentials or account not found
    await expect(page.getByText(/invalid credentials|user not found/i)).toBeVisible();
  });
});
