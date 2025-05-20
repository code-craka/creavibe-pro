export interface Doc {
  slug: string
  title: string
  description: string
  content: string
}

export async function getAllDocs(): Promise<Doc[]> {
  // In a real implementation, this would read from the file system
  // For demo purposes, we'll return mock data
  return [
    {
      slug: "getting-started",
      title: "Getting Started",
      description: "Learn how to get started with CreaVibe API and SDK",
      content: "",
    },
    {
      slug: "authentication",
      title: "Authentication",
      description: "Learn how to authenticate with the CreaVibe API",
      content: "",
    },
    {
      slug: "api-reference",
      title: "API Reference",
      description: "Explore the CreaVibe API endpoints and parameters",
      content: "",
    },
    {
      slug: "configuration",
      title: "Configuration",
      description: "Configure your CreaVibe integration",
      content: "",
    },
    {
      slug: "troubleshooting",
      title: "Troubleshooting",
      description: "Common issues and solutions",
      content: "",
    },
    {
      slug: "examples",
      title: "Examples",
      description: "Code examples for different programming languages",
      content: "",
    },
  ]
}

export async function getDocBySlug(slug: string): Promise<Doc> {
  // In a real implementation, this would read from the file system
  // For demo purposes, we'll return mock data based on the slug

  // Mock content for the getting-started page
  if (slug === "getting-started") {
    return {
      slug,
      title: "Getting Started with CreaVibe",
      description: "Learn how to get started with CreaVibe API and SDK",
      content: `
# Getting Started with CreaVibe

Welcome to the CreaVibe developer documentation! This guide will help you get started with our API and SDK.

## Overview

CreaVibe is a modern SaaS platform for AI-powered content creation and real-time creative collaboration. Our API allows you to integrate CreaVibe's powerful features into your own applications.

## Prerequisites

Before you begin, you'll need:

- A CreaVibe account
- API credentials (API key or OAuth client ID and secret)
- Basic knowledge of REST APIs

## Installation

### Using npm

\`\`\`bash
npm install @creavibe/sdk
\`\`\`

### Using yarn

\`\`\`bash
yarn add @creavibe/sdk
\`\`\`

### Using pnpm

\`\`\`bash
pnpm add @creavibe/sdk
\`\`\`

## Quick Start

Here's a simple example of how to use the CreaVibe SDK:

\`\`\`typescript
import { Creavibe } from '@creavibe/sdk';

// Initialize the client
const creavibe = new Creavibe({
  apiKey: 'your-api-key',
});

// Create a new project
async function createProject() {
  try {
    const project = await CreaVibejects.create({
      name: 'My First Project',
      description: 'A project created via the API',
    });
    
    console.log('Project created:', project);
  } catch (error) {
    console.error('Error creating project:', error);
  }
}

createProject();
\`\`\`

## Next Steps

- [Authentication](/docs/authentication) - Learn more about authentication options
- [API Reference](/docs/api-reference) - Explore the full API reference
- [Examples](/docs/examples) - See more code examples

## Support

If you need help, you can:

- [Join our Discord community](https://discord.gg/creavibe)
- [Contact our support team](mailto:support@creavibe.app)
- [Open an issue on GitHub](https://github.com/creavibe/sdk/issues)
      `,
    }
  }

  // Mock content for the authentication page
  if (slug === "authentication") {
    return {
      slug,
      title: "Authentication",
      description: "Learn how to authenticate with the CreaVibe API",
      content: `
# Authentication

CreaVibe offers multiple authentication methods to secure your API requests.

## API Keys

API keys are the simplest way to authenticate with the CreaVibe API. Each API key is associated with a specific user account and has specific permissions.

### Generating an API Key

1. Log in to your CreaVibe account
2. Navigate to Settings > API Keys
3. Click "Generate New API Key"
4. Give your key a name and select the appropriate permissions
5. Click "Create API Key"

> **Important:** API keys should be kept secure and never exposed in client-side code.

### Using API Keys

Include your API key in the Authorization header of your requests:

\`\`\`javascript
// Using fetch
fetch('https://api.CreaVibe/v1/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data));

// Using the SDK
import { Creavibe } from '@creavibe/sdk';

const creavibe = new Creavibe({
  apiKey: 'YOUR_API_KEY',
});

CreaVibejects.list()
  .then(projects => console.log(projects));
\`\`\`

## OAuth 2.0

For applications that need to access CreaVibe on behalf of users, we recommend using OAuth 2.0.

### Setting Up OAuth

1. Register your application in the CreaVibe Developer Portal
2. Configure your redirect URIs
3. Note your client ID and client secret

### OAuth Flow

\`\`\`javascript
// Step 1: Redirect the user to the authorization URL
const authUrl = 'https://app.creavibe.app/oauth/authorize?' +
  'client_id=YOUR_CLIENT_ID&' +
  'redirect_uri=YOUR_REDIRECT_URI&' +
  'response_type=code&' +
  'scope=read write';

// Step 2: Exchange the authorization code for an access token
async function getAccessToken(code) {
  const response = await fetch('https://api.creavibe.app/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'YOUR_REDIRECT_URI'
    })
  });
  
  return response.json();
}
\`\`\`

## JWT Authentication

For server-to-server communication, we also support JWT authentication.

\`\`\`javascript
import jwt from 'jsonwebtoken';

// Create a JWT
const token = jwt.sign(
  {
    sub: 'user-id',
    iss: 'your-app-id',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
  },
  'YOUR_JWT_SECRET'
);

// Use the JWT in your API requests
fetch('https://api.CreaVibe/v1/projects', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});
\`\`\`

## Security Best Practices

- Never expose API keys or client secrets in client-side code
- Rotate your API keys regularly
- Use the principle of least privilege when assigning permissions
- Implement proper error handling for authentication failures
- Use HTTPS for all API requests
      `,
    }
  }

  // Default mock content for other pages
  return {
    slug,
    title:
      slug
        .split("/")
        .pop()
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()) || "Documentation",
    description: `Documentation for ${slug}`,
    content: `
# ${slug
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())}

This is a placeholder for the ${slug} documentation page. In a real implementation, this content would be loaded from a markdown file.

## Example Code

\`\`\`typescript
// Example code for ${slug}
import { Creavibe } from '@creavibe/sdk';

const creavibe = new Creavibe({
  apiKey: 'your-api-key',
});

// Example function
async function exampleFunction() {
  try {
    const result = await creaVibe.someMethod();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

## Next Steps

- [Getting Started](/docs/getting-started)
- [API Reference](/docs/api-reference)
- [Examples](/docs/examples)
    `,
  }
}
