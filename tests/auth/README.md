# Authentication System Testing Guide

This guide provides instructions for testing the authentication system in CreaVibe using Playwright automated tests.

## Overview

The authentication testing suite covers the following key areas:

1. **Login Flow** - Tests for email/password login, validation, error handling, and social login options
2. **Signup Flow** - Tests for user registration, validation, and error handling
3. **Password Reset** - Tests for password reset request and completion
4. **Protected Routes** - Tests for route protection and redirection behavior
5. **Account Management** - Tests for profile updates, password changes, and account deletion

## Prerequisites

Before running the tests, ensure you have:

1. A running development server (or the tests will start one automatically)
2. A test user account (can be created using the setup script)
3. Playwright installed and configured (already done)

## Test User Setup

The tests use a predefined test user account. You can create this account by running:

```bash
pnpm test:setup-auth
```

This will create a test user with the credentials defined in `tests/utils/auth-utils.ts`. By default, this is:
- Email: `test@example.com`
- Password: `Password123!`

## Running the Tests

### Run All Authentication Tests

```bash
pnpm test:auth
```

### Run Specific Test Files

```bash
# Run only login tests
npx playwright test tests/auth/login.spec.ts

# Run only signup tests
npx playwright test tests/auth/signup.spec.ts

# Run only password reset tests
npx playwright test tests/auth/password-reset.spec.ts

# Run only protected routes tests
npx playwright test tests/auth/protected-routes.spec.ts

# Run only account management tests
npx playwright test tests/auth/account-management.spec.ts
```

### Run Tests with UI Mode

```bash
pnpm test:ui
```

This opens the Playwright UI mode, which provides a visual interface for running and debugging tests.

## Test Coverage

### 1. Login Flow Tests

- Basic form display and validation
- Invalid credentials handling
- Successful login and redirection
- Magic link login option
- Social login options
- Navigation to signup and password reset

### 2. Signup Flow Tests

- Basic form display and validation
- Password strength and confirmation validation
- Success message after signup
- Handling of existing email addresses
- Social signup options
- Navigation to login

### 3. Password Reset Tests

- Reset request form display and validation
- Success message after reset request
- Reset password form with token
- Navigation back to login

### 4. Protected Routes Tests

- Redirection to login when accessing protected routes while logged out
- Access to protected routes when logged in
- Redirection to dashboard when accessing auth pages while logged in
- Preservation of query parameters after authentication
- Loading state during authentication check

### 5. Account Management Tests

- Profile information updates
- Password change functionality
- Password change validation
- Account deletion process

## Debugging Failed Tests

When tests fail, Playwright provides several tools to help diagnose issues:

1. **Screenshots** - Automatically captured on test failure
2. **Videos** - Recorded for the first retry of a failed test
3. **Traces** - Detailed timeline of test execution

These artifacts are stored in the `test-results` directory.

## Common Issues and Solutions

1. **Test user doesn't exist** - Run the setup script to create the test user
2. **Selectors not finding elements** - UI components may have changed; update selectors in test files
3. **Timeouts** - Increase timeout values or check if the application is running properly
4. **Authentication state issues** - Ensure tests properly sign out after completion

## Extending the Tests

To add new tests:

1. Create a new test file in the `tests/auth` directory
2. Import the necessary utilities from `tests/utils/auth-utils.ts`
3. Follow the existing patterns for test structure
4. Add the new test file to the test documentation

## Best Practices

1. **Isolation** - Each test should be independent and not rely on the state from other tests
2. **Clean up** - Always sign out after tests that sign in
3. **Test data** - Use unique test data for each test run to avoid conflicts
4. **Error handling** - Test both happy paths and error scenarios
5. **Verification** - Always verify the expected outcome, don't just check for absence of errors

## Verification Steps

Before considering the authentication system fully tested, ensure:

1. ✅ All test cases pass consistently
2. ✅ Edge cases are covered (invalid inputs, network issues, etc.)
3. ✅ User flows are tested end-to-end
4. ✅ Security aspects are verified (password policies, protected routes)
5. ✅ UI feedback is tested (loading states, error messages, success notifications)
6. ✅ No test data or debug code is left in production code
