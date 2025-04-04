
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use window.location.origin to dynamically set the site URL
const SITE_URL = window.location.origin;
const SUPABASE_URL = "https://jdiixmlievukfclucfxc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkaWl4bWxpZXZ1a2ZjbHVjZnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzcwODEsImV4cCI6MjA1OTI1MzA4MX0.EUGdY5ib75gPdDnxSaAzLuMD8OWTpMnaOD3hwZwCUwI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: localStorage
    }
  }
);

// Log the site URL to help with debugging
console.log("App running at:", SITE_URL);

// Add event listener for auth state changes to help with debugging
supabase.auth.onAuthStateChange((event: string, session: object | null) => {
  console.log("Auth state changed:", event, session ? "User authenticated" : "No user");
});
