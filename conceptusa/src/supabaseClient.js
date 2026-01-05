import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.log('Make sure you have .env.local file with:');
  console.log('REACT_APP_SUPABASE_URL=your-project-url');
  console.log('REACT_APP_SUPABASE_ANON_KEY=your-anon-key');
}

// ⚠️ SECURITY WARNING ⚠️
// The service role key below bypasses Row Level Security (RLS).
// In production, consider moving admin operations to:
// - Vercel Serverless Functions (/api folder)
// - Supabase Edge Functions
// - A separate backend server
// This key should NEVER be exposed in client-side code in a production environment.
if (supabaseServiceRoleKey && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ Security Warning: Service Role Key detected in frontend production build.');
  console.warn('Consider moving admin operations to serverless functions for better security.');
}

// Public client - for reading cars and submitting inquiries (respects RLS)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Admin client - for admin panel operations (bypasses RLS with service_role key)
// Only used after password authentication in AdminPanel
// TODO: Move to serverless function for production security
export const supabaseAdmin = createClient(
  supabaseUrl || '',
  supabaseServiceRoleKey || supabaseAnonKey || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
