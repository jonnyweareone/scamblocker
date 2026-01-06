import { createClient } from '@supabase/supabase-js';

// SONIQ V2 Supabase Project (dtosgubmmdqxbeirtbom)
// This is the same backend as SONIQ portal - consumer accounts are managed there
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dtosgubmmdqxbeirtbom.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0b3NndWJtbWRxeGJlaXJ0Ym9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDc4MjIsImV4cCI6MjA4MDcyMzgyMn0.4SZ6XOnyKwmd4ymVYEYfq2tZD6Ex_UB8iZyQJPf9oq4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
