import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

console.log('Simple test is running!');
console.log('Environment variables:');
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set');
