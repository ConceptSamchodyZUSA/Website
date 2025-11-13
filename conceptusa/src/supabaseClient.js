import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.log('Make sure you have .env.local file with:');
  console.log('REACT_APP_SUPABASE_URL=your-project-url');
  console.log('REACT_APP_SUPABASE_ANON_KEY=your-anon-key');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
