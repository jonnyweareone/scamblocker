import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://otwrxbxumrbxugbqtofu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90d3J4Ynh1bXJieHVnYnF0b2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyOTA4MjcsImV4cCI6MjA0NTg2NjgyN30.djMKL00WJCvhgLJHvS2aFJvPCmoXBjV8oP1yGvbT4zc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
