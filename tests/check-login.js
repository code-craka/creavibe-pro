import { chromium } from 'playwright';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

console.log('Checking login page...');
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

async function checkLoginPage() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to login page...');
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    await page.waitForLoadState('networkidle');
    
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    
    // Check if login form is present
    const loginForm = await page.$('form');
    console.log('Login form found:', !!loginForm);
    
    if (loginForm) {
      console.log('Login page is accessible!');
    } else {
      console.log('Login form not found on the page');
    }
    
    // Take a screenshot for debugging
    await page.screenshot({ path: 'login-page.png' });
    console.log('Screenshot saved as login-page.png');
    
  } catch (error) {
    console.error('Error checking login page:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Run the function
checkLoginPage().catch(console.error);
