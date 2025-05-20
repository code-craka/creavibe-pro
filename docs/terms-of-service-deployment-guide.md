# Terms of Service Page Deployment Guide

This guide provides instructions for deploying the Terms of Service page for CreaVibe to Vercel.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account
2. Git installed on your local machine
3. Node.js (v16 or later) and npm installed
4. Access to the CreaVibe repository

## Local Setup and Testing

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/creavibe/creavibe-pro.git
   cd creavibe-pro
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000/terms-of-service` to verify the page is working correctly.

5. Test the page for:
   - Responsive design (mobile, tablet, desktop)
   - Accessibility (keyboard navigation, screen reader compatibility)
   - Content accuracy
   - Interactive elements (accordions, links)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install the Vercel CLI if you haven't already:
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. Login to Vercel:
   \`\`\`bash
   vercel login
   \`\`\`

3. Deploy the project:
   \`\`\`bash
   vercel
   \`\`\`

4. Follow the prompts to configure your deployment.

5. Once deployed, verify the Terms of Service page at `https://your-domain.vercel.app/terms-of-service`.

### Option 2: Deploy via Vercel Dashboard

1. Push your changes to your Git repository:
   \`\`\`bash
   git add .
   git commit -m "Add Terms of Service page"
   git push
   \`\`\`

2. Log in to the [Vercel Dashboard](https://vercel.com/dashboard).

3. If this is a new project, click "Import Project" and select your repository.

4. If the project is already set up, Vercel will automatically detect the changes and deploy them.

5. Once the deployment is complete, navigate to the Terms of Service page to verify it's working correctly.

## Post-Deployment Checks

After deploying, perform the following checks:

1. Verify all links are working correctly
2. Test the page on different devices and browsers
3. Check that all interactive elements (accordions, cards) function properly
4. Ensure the page loads quickly and efficiently
5. Validate that the breadcrumb navigation works correctly

## Updating the Terms of Service

When you need to update the Terms of Service:

1. Make the necessary changes to the `terms-of-service-content.tsx` file
2. Update the "Last updated" date in the `page.tsx` file
3. Test the changes locally
4. Deploy the updates following the steps above

## Troubleshooting

If you encounter issues during deployment:

1. Check the Vercel deployment logs for errors
2. Verify that all dependencies are correctly installed
3. Ensure that the file paths and imports are correct
4. Test the page locally before deploying

## Support

If you need assistance with deployment, contact the development team at dev@CreaVibe.
