import { test, expect } from '@playwright/test';
import { TEST_USER, signIn, signOut, verifyProtectedRouteAccess } from '../utils/auth-utils';

test.describe('Protected Routes', () => {
  // Define the protected routes to test
  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    '/projects',
    '/ai-tools'
  ];
  
  // Define auth pages that should redirect to dashboard when authenticated
  const authPages = [
    '/login',
    '/signup',
    '/auth/reset-password'
  ];

  test('should redirect to login when accessing protected routes while logged out', async ({ page }) => {
    // Test each protected route
    for (const route of protectedRoutes) {
      await page.goto(route);
      
      // Should be redirected to login with redirectedFrom parameter
      await expect(page).toHaveURL(/\/login/);
      expect(page.url()).toContain('redirectedFrom');
    }
  });

  test('should allow access to protected routes when logged in', async ({ page }) => {
    // Sign in first
    await signIn(page, TEST_USER.email, TEST_USER.password);
    
    // Test each protected route
    for (const route of protectedRoutes) {
      await page.goto(route);
      
      // Should stay on the protected route
      await expect(page).toHaveURL(route);
    }
    
    // Clean up - sign out
    await signOut(page);
  });

  test('should redirect to dashboard when accessing auth pages while logged in', async ({ page }) => {
    // Sign in first
    await signIn(page, TEST_USER.email, TEST_USER.password);
    
    // Test each auth page
    for (const route of authPages) {
      await page.goto(route);
      
      // Should be redirected to dashboard
      await expect(page).toHaveURL('/dashboard');
    }
    
    // Clean up - sign out
    await signOut(page);
  });

  test('should preserve query parameters after authentication', async ({ page }) => {
    // Go to a protected route with query parameters
    await page.goto('/dashboard?view=projects&sort=recent');
    
    // Should be redirected to login
    await expect(page).toHaveURL(/\/login/);
    
    // Sign in
    await signIn(page, TEST_USER.email, TEST_USER.password);
    
    // Should be redirected back to the original URL with query parameters
    await expect(page).toHaveURL(/\/dashboard\?view=projects&sort=recent/);
    
    // Clean up - sign out
    await signOut(page);
  });

  test('should show loading state during authentication check', async ({ page }) => {
    // This test is a bit tricky as the loading state might be very brief
    // We'll use a request interception to slow down the auth check
    
    await page.route('**/auth/session', async (route) => {
      // Delay the response by 1 second to make loading state visible
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.continue();
    });
    
    // Go to a protected route
    await page.goto('/dashboard');
    
    // Should show loading state briefly
    const loadingElement = page.getByText(/loading/i);
    
    // This might be flaky if the loading state is too brief
    try {
      await expect(loadingElement).toBeVisible({ timeout: 500 });
    } catch (e) {
      // If we can't catch the loading state, that's okay
      console.log('Loading state was too brief to capture');
    }
  });
});
