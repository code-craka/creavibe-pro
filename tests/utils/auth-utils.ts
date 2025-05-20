import { Page, expect } from '@playwright/test';

// Test user credentials - these should be test accounts only
export const TEST_USER = {
  email: 'test@example.com',
  password: 'Password123!',
  newPassword: 'NewPassword123!',
};

/**
 * Sign up a new user
 */
export async function signUp(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/signup');
  await page.waitForLoadState('networkidle');
  
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Confirm Password').fill(password);
  
  await page.getByRole('button', { name: /Sign Up/i }).click();
  
  // Wait for either success message or error
  await page.waitForSelector('text=verification email || text=Error');
}

/**
 * Sign in an existing user
 */
export async function signIn(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  
  await page.getByRole('button', { name: /Sign In/i }).click();
  
  // Wait for navigation to dashboard or error message
  await Promise.race([
    page.waitForURL('/dashboard'),
    page.waitForSelector('text=Invalid credentials')
  ]);
}

/**
 * Sign out the current user
 */
export async function signOut(page: Page): Promise<void> {
  // Click on user avatar to open dropdown
  await page.getByRole('button', { name: /user menu/i }).click();
  
  // Click on sign out button
  await page.getByRole('menuitem', { name: /Log out/i }).click();
  
  // Wait for redirect to home or login page
  await Promise.race([
    page.waitForURL('/'),
    page.waitForURL('/login')
  ]);
}

/**
 * Request password reset
 */
export async function requestPasswordReset(page: Page, email: string): Promise<void> {
  await page.goto('/login');
  await page.getByRole('link', { name: /Forgot password/i }).click();
  
  await page.waitForURL('/auth/reset-password');
  await page.getByLabel('Email').fill(email);
  
  await page.getByRole('button', { name: /Send Reset Link/i }).click();
  
  // Wait for success message
  await page.waitForSelector('text=password reset email has been sent');
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  // Look for user avatar in the navbar
  const userAvatar = await page.$('nav [role="button"][aria-label="User menu"]');
  return !!userAvatar;
}

/**
 * Verify protected route access
 */
export async function verifyProtectedRouteAccess(page: Page, route: string): Promise<void> {
  await page.goto(route);
  
  // If not authenticated, should redirect to login
  const url = page.url();
  if (url.includes('/login')) {
    expect(url).toContain('redirectedFrom');
    return;
  }
  
  // If authenticated, should stay on the protected route
  expect(page.url()).toContain(route);
}

/**
 * Delete account
 */
export async function deleteAccount(page: Page): Promise<void> {
  await page.goto('/settings');
  
  // Scroll to the account deletion section
  await page.getByText('Delete Account').scrollIntoViewIfNeeded();
  
  // Click delete account button
  await page.getByRole('button', { name: /Delete Account/i }).click();
  
  // Confirm deletion
  await page.getByLabel(/Type DELETE MY ACCOUNT to confirm/i).fill('DELETE MY ACCOUNT');
  
  // Click final delete button
  await page.getByRole('button', { name: /Delete Account/i }).nth(1).click();
  
  // Wait for redirect to home page
  await page.waitForURL('/');
}
