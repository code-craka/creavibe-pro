#!/bin/bash

echo "Starting Supabase MCP server..."

# Export the Supabase access token
export SUPABASE_ACCESS_TOKEN=sbp_49d2e94a6361a02a8f2a91c7699605c6aaea320a
echo "Access token set: $SUPABASE_ACCESS_TOKEN"

# Run the Supabase MCP server with minimal arguments
echo "Running Supabase MCP server..."
npx @supabase/mcp-server-supabase

echo "Supabase MCP server exited with code: $?"
