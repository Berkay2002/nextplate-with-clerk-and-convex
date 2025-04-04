import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  console.log("Auth callback route triggered");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  console.log("Auth code received:", code ? "Code exists" : "No code");

  if (code) {
    const supabase = await createClient();
    
    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error("Error exchanging code for session:", error);
      } else {
        console.log("Session exchange successful, user authenticated:", !!data.session);
      }
    } catch (e) {
      console.error("Exception during code exchange:", e);
    }
  }

  // The user will be automatically redirected to the redirectTo URL specified in signInWithOAuth
  const returnUrl = requestUrl.searchParams.get('redirect_to') || '/dashboard';
  console.log("Redirecting to:", returnUrl);
  return NextResponse.redirect(new URL(returnUrl, request.url));
} 