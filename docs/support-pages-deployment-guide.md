# CreaVibe Support Pages Deployment Guide

This guide will walk you through deploying the Help Center and Community Hub pages to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (linked to your GitHub account)
- Node.js installed on your local machine

## Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize your local repository and push the code:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/creavibe-support.git
git push -u origin main
\`\`\`

## Step 2: Deploy to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
5. Add environment variables if needed
6. Click "Deploy"

## Step 3: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain (e.g., support.CreaVibe)
3. Follow the instructions to configure DNS settings

## Step 4: Set Up Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository. Any changes pushed to the main branch will trigger a new deployment.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel
2. Ensure all dependencies are correctly installed
3. Verify that environment variables are properly set
4. Check for any syntax errors in your code

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Shadcn/UI Documentation](https://ui.shadcn.com)
