# CreaVibe API Documentation

This document provides comprehensive documentation for the CreaVibe API. The API allows you to programmatically interact with CreaVibe's features, including content generation, project management, and user administration.

## Base URL

All API requests should be made to:

\`\`\`
`https://api.CreaVibe/v1`
\`\`\`

For development and testing, you can use:

\`\`\`
`http://localhost:3000/api/v1`
\`\`\`

## Authentication

### API Key Authentication

Most API endpoints require authentication using an API key. You can generate an API key in your CreaVibe dashboard under Settings > API.

Include your API key in the request headers:

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

### JWT Authentication

Some endpoints support JWT authentication for user-specific operations. After logging in, include the JWT token in the request headers:

\`\`\`
Authorization: Bearer YOUR_JWT_TOKEN
\`\`\`

## Rate Limiting

API requests are rate-limited to prevent abuse. The default rate limits are:

- 60 requests per minute for standard accounts
- 120 requests per minute for premium accounts
- 300 requests per minute for enterprise accounts

Rate limit information is included in the response headers:

\`\`\`
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1620000000
\`\`\`

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request. In case of an error, the response body will contain additional information:

\`\`\`json
{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "Missing required field: title"
  }
}
\`\`\`

Common error codes:

- `400 Bad Request`: The request was malformed or missing required parameters
- `401 Unauthorized`: Authentication failed or API key is invalid
- `403 Forbidden`: The authenticated user doesn't have permission to access the requested resource
- `404 Not Found`: The requested resource doesn't exist
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: An unexpected error occurred on the server

## API Endpoints

### Content Generation

#### Generate Blog Content

\`\`\`
POST /generate/blog
\`\`\`

Generate a blog post based on the provided parameters.

**Request Body:**

\`\`\`json
{
  "title": "The Future of AI in Marketing",
  "keywords": ["AI", "marketing", "automation"],
  "tone": "professional",
  "length": "medium",
  "format": "markdown"
}
\`\`\`

**Response:**

\`\`\`json
{
  "id": "gen_123456789",
  "type": "blog",
  "content": "# The Future of AI in Marketing\n\nArtificial Intelligence is revolutionizing...",
  "tokens_used": 1250,
  "model": "gpt-4",
  "created_at": "2023-05-01T12:00:00Z"
}
\`\`\`

#### Generate Image

\`\`\`
POST /generate/image
\`\`\`

Generate an image based on the provided parameters.

**Request Body:**

\`\`\`json
{
  "prompt": "A futuristic cityscape with flying cars and neon lights",
  "style": "digital art",
  "size": "1024x1024",
  "format": "png"
}
\`\`\`

**Response:**

\`\`\`json
{
  "id": "gen_987654321",
  "type": "image",
  "url": "`https://storage.CreaVibe/generations/image_987654321.png`",
  "prompt": "A futuristic cityscape with flying cars and neon lights",
  "model": "dall-e-3",
  "created_at": "2023-05-01T12:00:00Z"
}
\`\`\`

#### Generate Video Script

\`\`\`
POST /generate/video-script
\`\`\`

Generate a video script based on the provided parameters.

**Request Body:**

\`\`\`json
{
  "title": "Product Introduction",
  "product": "CreaVibe",
  "duration": "60",
  "tone": "enthusiastic",
  "target_audience": "marketing professionals"
}
\`\`\`

**Response:**

\`\`\`json
{
  "id": "gen_567891234",
  "type": "video-script",
  "content": "[Upbeat music]\n\nNarrator: Introducing CreaVibe, the ultimate platform for...",
  "tokens_used": 850,
  "model": "gpt-4",
  "created_at": "2023-05-01T12:00:00Z"
}
\`\`\`

### Projects

#### List Projects

\`\`\`
GET /projects
\`\`\`

Retrieve a list of projects for the authenticated user.

**Query Parameters:**

- `status` (optional): Filter by status (`draft`, `published`)
- `limit` (optional): Maximum number of projects to return (default: 20)
- `offset` (optional): Number of projects to skip (default: 0)

**Response:**

\`\`\`json
{
  "projects": [
    {
      "project_id": "proj_123456789",
      "title": "Q2 Marketing Campaign",
      "description": "Content for the Q2 marketing campaign",
      "status": "published",
      "last_updated": "2023-05-01T12:00:00Z"
    },
    {
      "project_id": "proj_987654321",
      "title": "Product Launch",
      "description": "Content for the new product launch",
      "status": "draft",
      "last_updated": "2023-04-15T10:30:00Z"
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0
}
\`\`\`

#### Get Project

\`\`\`
GET /projects/{project_id}
\`\`\`

Retrieve a specific project by ID.

**Response:**

\`\`\`json
{
  "project_id": "proj_123456789",
  "title": "Q2 Marketing Campaign",
  "description": "Content for the Q2 marketing campaign",
  "status": "published",
  "last_updated": "2023-05-01T12:00:00Z",
  "created_at": "2023-04-01T09:00:00Z"
}
\`\`\`

#### Create Project

\`\`\`
POST /projects
\`\`\`

Create a new project.

**Request Body:**

\`\`\`json
{
  "title": "New Marketing Campaign",
  "description": "Content for the upcoming marketing campaign",
  "status": "draft"
}
\`\`\`

**Response:**

\`\`\`json
{
  "project_id": "proj_123456789",
  "title": "New Marketing Campaign",
  "description": "Content for the upcoming marketing campaign",
  "status": "draft",
  "last_updated": "2023-05-01T12:00:00Z",
  "created_at": "2023-05-01T12:00:00Z"
}
\`\`\`

#### Update Project

\`\`\`
PUT /projects/{project_id}
\`\`\`

Update an existing project.

**Request Body:**

\`\`\`json
{
  "title": "Updated Marketing Campaign",
  "description": "Updated content for the marketing campaign",
  "status": "published"
}
\`\`\`

**Response:**

\`\`\`json
{
  "project_id": "proj_123456789",
  "title": "Updated Marketing Campaign",
  "description": "Updated content for the marketing campaign",
  "status": "published",
  "last_updated": "2023-05-01T12:00:00Z",
  "created_at": "2023-04-01T09:00:00Z"
}
\`\`\`

#### Delete Project

\`\`\`
DELETE /projects/{project_id}
\`\`\`

Delete a project.

**Response:**

\`\`\`json
{
  "success": true,
  "message": "Project deleted successfully"
}
\`\`\`

### WebBooks

#### List WebBooks

\`\`\`
GET /webbooks
\`\`\`

Retrieve a list of webbooks for the authenticated user.

**Query Parameters:**

- `visibility` (optional): Filter by visibility (`public`, `private`)
- `published` (optional): Filter by published status (`true`, `false`)
- `limit` (optional): Maximum number of webbooks to return (default: 20)
- `offset` (optional): Number of webbooks to skip (default: 0)

**Response:**

\`\`\`json
{
  "webbooks": [
    {
      "webbook_id": "wb_123456789",
      "title": "Complete Guide to Content Marketing",
      "visibility": "public",
      "is_published": true,
      "slug": "content-marketing-guide",
      "created_at": "2023-05-01T12:00:00Z"
    },
    {
      "webbook_id": "wb_987654321",
      "title": "Internal Brand Guidelines",
      "visibility": "private",
      "is_published": true,
      "slug": "brand-guidelines",
      "created_at": "2023-04-15T10:30:00Z"
    }
  ],
  "total": 2,
  "limit": 20,
  "offset": 0
}
\`\`\`

#### Get WebBook

\`\`\`
GET /webbooks/{webbook_id}
\`\`\`

Retrieve a specific webbook by ID.

**Response:**

\`\`\`json
{
  "webbook_id": "wb_123456789",
  "title": "Complete Guide to Content Marketing",
  "visibility": "public",
  "is_published": true,
  "slug": "content-marketing-guide",
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T12:00:00Z",
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter"
  }
}
\`\`\`

#### Create WebBook

\`\`\`
POST /webbooks
\`\`\`

Create a new webbook.

**Request Body:**

\`\`\`json
{
  "title": "New WebBook",
  "visibility": "private",
  "slug": "new-webbook",
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter"
  }
}
\`\`\`

**Response:**

\`\`\`json
{
  "webbook_id": "wb_123456789",
  "title": "New WebBook",
  "visibility": "private",
  "is_published": false,
  "slug": "new-webbook",
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T12:00:00Z",
  "theme": {
    "primaryColor": "#3B82F6",
    "fontFamily": "Inter"
  }
}
\`\`\`

#### Update WebBook

\`\`\`
PUT /webbooks/{webbook_id}
\`\`\`

Update an existing webbook.

**Request Body:**

\`\`\`json
{
  "title": "Updated WebBook",
  "visibility": "public",
  "is_published": true,
  "theme": {
    "primaryColor": "#10B981",
    "fontFamily": "Roboto"
  }
}
\`\`\`

**Response:**

\`\`\`json
{
  "webbook_id": "wb_123456789",
  "title": "Updated WebBook",
  "visibility": "public",
  "is_published": true,
  "slug": "new-webbook",
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T13:00:00Z",
  "theme": {
    "primaryColor": "#10B981",
    "fontFamily": "Roboto"
  }
}
\`\`\`

#### Delete WebBook

\`\`\`
DELETE /webbooks/{webbook_id}
\`\`\`

Delete a webbook.

**Response:**

\`\`\`json
{
  "success": true,
  "message": "WebBook deleted successfully"
}
\`\`\`

### Chapters

#### List Chapters

\`\`\`
GET /webbooks/{webbook_id}/chapters
\`\`\`

Retrieve a list of chapters for a specific webbook.

**Response:**

\`\`\`json
{
  "chapters": [
    {
      "chapter_id": "ch_123456789",
      "title": "Introduction",
      "order_index": 1,
      "created_at": "2023-05-01T12:00:00Z"
    },
    {
      "chapter_id": "ch_987654321",
      "title": "Getting Started",
      "order_index": 2,
      "created_at": "2023-05-01T12:30:00Z"
    }
  ],
  "total": 2
}
\`\`\`

#### Get Chapter

\`\`\`
GET /webbooks/{webbook_id}/chapters/{chapter_id}
\`\`\`

Retrieve a specific chapter by ID.

**Response:**

\`\`\`json
{
  "chapter_id": "ch_123456789",
  "webbook_id": "wb_123456789",
  "title": "Introduction",
  "content": "# Introduction\n\nWelcome to the complete guide to content marketing...",
  "order_index": 1,
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T12:00:00Z"
}
\`\`\`

#### Create Chapter

\`\`\`
POST /webbooks/{webbook_id}/chapters
\`\`\`

Create a new chapter for a webbook.

**Request Body:**

\`\`\`json
{
  "title": "New Chapter",
  "content": "# New Chapter\n\nThis is the content of the new chapter...",
  "order_index": 3
}
\`\`\`

**Response:**

\`\`\`json
{
  "chapter_id": "ch_123456789",
  "webbook_id": "wb_123456789",
  "title": "New Chapter",
  "content": "# New Chapter\n\nThis is the content of the new chapter...",
  "order_index": 3,
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T12:00:00Z"
}
\`\`\`

#### Update Chapter

\`\`\`
PUT /webbooks/{webbook_id}/chapters/{chapter_id}
\`\`\`

Update an existing chapter.

**Request Body:**

\`\`\`json
{
  "title": "Updated Chapter",
  "content": "# Updated Chapter\n\nThis is the updated content of the chapter...",
  "order_index": 2
}
\`\`\`

**Response:**

\`\`\`json
{
  "chapter_id": "ch_123456789",
  "webbook_id": "wb_123456789",
  "title": "Updated Chapter",
  "content": "# Updated Chapter\n\nThis is the updated content of the chapter...",
  "order_index": 2,
  "created_at": "2023-05-01T12:00:00Z",
  "updated_at": "2023-05-01T13:00:00Z"
}
\`\`\`

#### Delete Chapter

\`\`\`
DELETE /webbooks/{webbook_id}/chapters/{chapter_id}
\`\`\`

Delete a chapter.

**Response:**

\`\`\`json
{
  "success": true,
  "message": "Chapter deleted successfully"
}
\`\`\`

### User Management

#### Get Current User

\`\`\`
GET /user
\`\`\`

Retrieve information about the currently authenticated user.

**Response:**

\`\`\`json
{
  "user_id": "user_123456789",
  "email": "user@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "avatar_url": "<https://example.com/avatar.jpg>",
  "created_at": "2023-01-01T00:00:00Z"
}
\`\`\`

#### Update User Profile

\`\`\`
PUT /user/profile
\`\`\`

Update the profile of the currently authenticated user.

**Request Body:**

\`\`\`json
{
  "username": "johndoe2",
  "full_name": "John Doe Jr.",
  "avatar_url": "<https://example.com/new-avatar.jpg>",
  "bio": "Content creator and marketing professional"
}
\`\`\`

**Response:**

\`\`\`json
{
  "user_id": "user_123456789",
  "email": "user@example.com",
  "username": "johndoe2",
  "full_name": "John Doe Jr.",
  "avatar_url": "<https://example.com/new-avatar.jpg>",
  "bio": "Content creator and marketing professional",
  "created_at": "2023-01-01T00:00:00Z",
  "updated_at": "2023-05-01T12:00:00Z"
}
\`\`\`

### API Tokens

#### List API Tokens

\`\`\`
GET /api-tokens
\`\`\`

Retrieve a list of API tokens for the authenticated user.

**Response:**

\`\`\`json
{
  "tokens": [
    {
      "token_id": "tok_123456789",
      "name": "Production API Key",
      "last_used": "2023-05-01T10:00:00Z",
      "created_at": "2023-01-01T00:00:00Z",
      "expires_at": "2024-01-01T00:00:00Z"
    },
    {
      "token_id": "tok_987654321",
      "name": "Development API Key",
      "last_used": null,
      "created_at": "2023-04-01T00:00:00Z",
      "expires_at": null
    }
  ]
}
\`\`\`

#### Create API Token

\`\`\`
POST /api-tokens
\`\`\`

Create a new API token.

**Request Body:**

\`\`\`json
{
  "name": "New API Key",
  "expires_at": "2024-05-01T00:00:00Z",
  "rate_limit_config": {
    "requests_per_minute": 100,
    "daily_limit": 10000
  }
}
\`\`\`

**Response:**

\`\`\`json
{
  "token_id": "tok_123456789",
  "name": "New API Key",
  "token_value": "crv_1234567890abcdefghijklmnopqrstuvwxyz",
  "created_at": "2023-05-01T12:00:00Z",
  "expires_at": "2024-05-01T00:00:00Z",
  "rate_limit_config": {
    "requests_per_minute": 100,
    "daily_limit": 10000
  }
}
\`\`\`

**Important**: The `token_value` is only returned once when the token is created. Make sure to store it securely.

#### Delete API Token

\`\`\`
DELETE /api-tokens/{token_id}
\`\`\`

Delete an API token.

**Response:**

\`\`\`json
{
  "success": true,
  "message": "API token deleted successfully"
}
\`\`\`

## Webhooks

CreaVibe supports webhooks to notify your application of events. You can configure webhooks in your dashboard under Settings > Webhooks.

### Webhook Events

- `generation.completed`: Triggered when a content generation is completed
- `project.created`: Triggered when a new project is created
- `project.updated`: Triggered when a project is updated
- `webbook.published`: Triggered when a webbook is published

### Webhook Payload

\`\`\`json
{
  "event": "generation.completed",
  "created_at": "2023-05-01T12:00:00Z",
  "data": {
    "id": "gen_123456789",
    "type": "blog",
    "user_id": "user_123456789",
    "tokens_used": 1250,
    "model": "gpt-4",
    "created_at": "2023-05-01T12:00:00Z"
  }
}
\`\`\`

### Webhook Security

To verify that a webhook came from CreaVibe, check the `X-Creavibe-Signature` header. The header contains a HMAC SHA-256 signature of the request body, using your webhook secret as the key.

\`\`\`javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}
\`\`\`

## SDKs and Client Libraries

We provide official client libraries for several programming languages:

- [JavaScript/TypeScript](https://github.com/creavibe/creavibe-js)
- [Python](https://github.com/creavibe/creavibe-python)
- [Ruby](https://github.com/creavibe/creavibe-ruby)
- [PHP](https://github.com/creavibe/creavibe-php)
- [Go](https://github.com/creavibe/creavibe-go)

## Support

If you have any questions or need help with the API, please contact our support team at [api-support@CreaVibe](mailto:api-support@CreaVibe).
\`\`\`

Now, let's create the project boilerplate documentation:
