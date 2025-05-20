import { chromium } from '@playwright/test';
import { TEST_USER } from './utils/auth-utils';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Load environment variables
dotenv.config({ path: '.env.local' });

/**
 * This script sets up a test user account for the authentication tests.
 * Run this script before running the authentication tests if you need to create a test user.
 */
async function setupTestUser() {
  console.log('Setting up test user for authentication tests...');
  
  let browser: any = null;
  let page: any = null;
  
  try {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    
    // Go to signup page
    await page.goto('http://localhost:3001/signup');
    
    // Check if we need to create a new user
    console.log(`Attempting to create test user: ${TEST_USER.email}`);
    
    // Fill the signup form
    await page.getByLabel('Email').fill(TEST_USER.email);
    await page.getByLabel('Password').fill(TEST_USER.password);
    await page.getByLabel('Confirm Password').fill(TEST_USER.password);
    
    // Submit the form
    await page.getByRole('button', { name: /Sign Up/i }).click();
    
    // Wait for response
    await page.waitForTimeout(2000);
    
    // Check if we got an error about existing user
    const errorText = await page.getByText(/already registered|already exists/i).isVisible();
    
    if (errorText) {
      console.log('Test user already exists. No need to create a new one.');
    } else {
      console.log('Test user created successfully. Check your email for verification.');
      
      // Wait for manual verification if needed
      console.log('Please verify the test user email if required by your setup.');
      await page.waitForTimeout(10000); // Give some time to manually check
    }
    
    console.log('Test user setup complete.');
  } catch (error) {
    console.error('Error setting up test user:', error);
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}

// Run the setup
setupTestUser().catch(console.error);
