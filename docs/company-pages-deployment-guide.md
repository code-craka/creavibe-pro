# Creavibe.pro Company Pages Deployment Guide

This guide provides step-by-step instructions for deploying the Creavibe.pro company pages (About, Careers, and Contact) to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A GitHub account
2. Access to the Creavibe.pro repository
3. A Vercel account linked to your GitHub account

## Deployment Steps

### 1. Push Your Code to GitHub

First, push your code to your GitHub repository:

\`\`\`bash
git add .
git commit -m "Add company pages: About, Careers, and Contact"
git push origin main
\`\`\`

### 2. Deploy to Vercel

#### Option 1: Automatic Deployment

If you've already set up continuous deployment with Vercel:

1. The push to your main branch will automatically trigger a deployment
2. Vercel will build and deploy your application
3. You can monitor the deployment progress in the Vercel dashboard

#### Option 2: Manual Deployment

If you haven't set up continuous deployment:

1. Log in to your Vercel account
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose the Creavibe.pro repository
5. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
6. Click "Deploy"

### 3. Configure Environment Variables

If your contact form requires environment variables (e.g., for email service integration):

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add the required environment variables:
   - EMAIL_SERVICE_API_KEY
   - EMAIL_RECIPIENT
   - RECAPTCHA_SITE_KEY (if using reCAPTCHA)

### 4. Set Up a Custom Domain

To use your custom domain:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Add your domain (e.g., creavibe.pro)
4. Follow the instructions to configure your DNS settings

### 5. Test Your Deployment

After deployment:

1. Visit your deployed site
2. Test all pages and functionality:
   - Navigation between pages
   - Contact form submission
   - Responsive design on different devices
3. Check for any console errors or performance issues

## Post-Deployment Optimization

### Performance Optimization

1. Run Lighthouse tests to identify performance issues
2. Optimize images further if needed
3. Consider implementing lazy loading for below-the-fold content

### SEO Optimization

1. Verify meta tags are correctly implemented
2. Submit your sitemap to search engines
3. Set up Google Analytics or similar tracking

### Monitoring

1. Set up error tracking with Sentry or similar service
2. Configure uptime monitoring
3. Set up alerts for critical issues

## Troubleshooting Common Issues

### Build Failures

If your build fails:

1. Check the build logs in Vercel
2. Verify all dependencies are correctly installed
3. Ensure there are no syntax errors in your code

### Contact Form Issues

If the contact form doesn't work:

1. Check environment variables are correctly set
2. Verify the form submission endpoint is accessible
3. Test the form with different inputs

### Image Loading Issues

If images don't load:

1. Verify image paths are correct
2. Check image formats are supported
3. Ensure images are properly optimized

## Need Help?

If you encounter any issues during deployment, contact the development team at dev@creavibe.pro or open an issue in the GitHub repository.
