# Creavibe.pro Supabase Deployment Guide

This guide will walk you through setting up and deploying the Creavibe.pro platform with Supabase authentication and database.

## Prerequisites

- A Vercel account for deploying the Next.js application
- A Supabase account for authentication and database services
- Node.js and npm installed on your local machine

## Step 1: Set Up Supabase Project

1. Log in to your Supabase account and create a new project.
2. Note your project URL and anon key from the API settings page.
3. Run the SQL migration script in the SQL editor:
   - Copy the contents of `lib/supabase-schema.sql` and execute it in the Supabase SQL editor.

## Step 2: Configure Authentication Settings

1. In your Supabase dashboard, go to Authentication > Settings.
2. Configure the Site URL to match your production URL (e.g., `https://creavibe.pro`).
3. Add any additional redirect URLs for local development (e.g., `http://localhost:3000`).
4. Enable the authentication providers you want to use (Email/Password, Magic Link, etc.).
5. Customize email templates for authentication emails if desired.

## Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root with the following variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

## Step 4: Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Log in to your Vercel account and create a new project.
3. Import your Git repository.
4. Configure the environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase project details.
5. Deploy the project.

## Step 5: Configure Production URLs

1. After deployment, update your Supabase authentication settings with your production URL.
2. Add your production domain to the list of allowed redirect URLs.

## Step 6: Testing

1. Test the authentication flow by creating a new account.
2. Verify that magic link authentication works correctly.
3. Test profile updates and other user management features.
4. Verify that real-time features are working as expected.

## Troubleshooting

- If authentication callbacks aren't working, check that your redirect URLs are correctly configured in Supabase.
- If you encounter CORS issues, ensure your Supabase project has the correct origins allowed.
- For database access issues, verify that your Row Level Security (RLS) policies are correctly set up.

## Security Considerations

- Regularly audit your RLS policies to ensure data is properly protected.
- Consider implementing rate limiting for authentication attempts.
- Regularly update dependencies to patch security vulnerabilities.
- Use environment variables for all sensitive information.
- Consider implementing additional security measures like CAPTCHA for registration forms.
