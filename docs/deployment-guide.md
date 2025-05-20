# Deploying the Documentation Site to Vercel

This guide will walk you through the process of deploying the CreaVibe documentation site to Vercel.

## Prerequisites

Before you begin, make sure you have:

1. A GitHub account
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com))
3. The documentation site code in a GitHub repository

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your documentation site code is pushed to a GitHub repository.

\`\`\`bash
git add .
git commit -m "Documentation site ready for deployment"
git push origin main
\`\`\`

### 2. Import Your Project to Vercel

1. Log in to your Vercel account
2. Click on "Add New..." and select "Project"
3. Import your GitHub repository
4. Vercel will automatically detect that it's a Next.js project

### 3. Configure Project Settings

1. **Project Name**: Enter a name for your project (e.g., "creavibe-docs")
2. **Framework Preset**: Ensure "Next.js" is selected
3. **Root Directory**: Leave as default if your project is in the root of the repository
4. **Build Command**: Leave as default (`next build`)
5. **Output Directory**: Leave as default (`.next`)
6. **Environment Variables**: Add any necessary environment variables

### 4. Deploy

Click "Deploy" and wait for the deployment to complete. Vercel will build and deploy your documentation site.

### 5. Custom Domain (Optional)

1. Go to the "Domains" tab in your project settings
2. Add your custom domain (e.g., "docs.CreaVibe")
3. Follow the instructions to configure DNS settings

## Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository. Any changes pushed to the main branch will trigger a new deployment.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs for errors
2. Ensure all dependencies are correctly specified in package.json
3. Verify that your Next.js configuration is correct
4. Check that your content files are in the correct location

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/docs/)
