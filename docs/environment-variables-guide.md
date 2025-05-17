# Environment Variables Guide for Creavibe.pro

This guide explains how to set up and manage environment variables for the Creavibe.pro application in different environments.

## Required Environment Variables

The following environment variables are required for the application to function properly:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | The URL of your Supabase project | `https://bfqomtgojmesytihgvte.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The anonymous key for your Supabase project | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

## Development Environment

For local development, you can set up environment variables in a `.env.local` file in the root of your project:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://bfqomtgojmesytihgvte.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

This file should not be committed to your repository. Add it to your `.gitignore` file.

## Production Environment (Vercel)

To set up environment variables in Vercel:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Environment Variables"
3. Add each environment variable with its corresponding value
4. Click "Save" to apply the changes
5. Redeploy your application for the changes to take effect

## Production Environment (Other Hosting Providers)

For other hosting providers, refer to their documentation on how to set environment variables. Generally, you'll need to:

1. Find the environment variables section in your hosting provider's dashboard
2. Add each environment variable with its corresponding value
3. Restart your application or redeploy for the changes to take effect

## Environment Variables in the Application

In the application code, environment variables are accessed using `process.env`:

\`\`\`typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
\`\`\`

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Other variables are only available on the server.

## Fallback Values

For development convenience, the application includes fallback values for the Supabase environment variables in `lib/env.ts`. However, it's recommended to set these variables properly in your environment rather than relying on the fallbacks.

## Security Considerations

- Never commit sensitive environment variables to your repository
- Use different Supabase projects for development and production
- Regularly rotate your Supabase keys for security
- Consider using environment-specific variables (e.g., `.env.development`, `.env.production`)
\`\`\`

Let's update the SupabaseWarning component to check for our hardcoded values:
