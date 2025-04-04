"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { toast } from "sonner";

export function SupabaseGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authInProgress, setAuthInProgress] = useState(false);
  const supabase = createClient();

  // Check for user on initial load
  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("Checking for existing session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          toast.error("Error checking auth session");
        }
        
        console.log("Session check result:", session ? "Session exists" : "No session");
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log("Auth state changed:", event, "User:", session?.user?.email);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignIn = useCallback(async () => {
    try {
      setAuthInProgress(true);
      toast.info("Redirecting to Google...");
      
      // Get current site URL for redirect
      const redirectTo = `${window.location.origin}/auth/callback`;
      console.log("Using redirect URL:", redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      console.log("Sign in initiated:", data ? "Success" : "Failed", "URL:", data?.url);
      
      if (error) {
        toast.error("Failed to sign in with Google: " + error.message);
        console.error("Google auth error:", error);
        setAuthInProgress(false);
      }
    } catch (error) {
      console.error("Google auth exception:", error);
      toast.error("An unexpected error occurred");
      setAuthInProgress(false);
    }
  }, [supabase.auth]);

  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      console.log("Sign out successful");
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    } finally {
      setLoading(false);
    }
  }, [supabase.auth]);

  return (
    <div className="flex flex-col gap-4">
      {user ? (
        <div className="flex flex-col gap-2">
          <p>Signed in as: {user.email}</p>
          <Button 
            onClick={handleSignOut}
            disabled={loading}
            variant="outline"
          >
            {loading ? "Loading..." : "Sign Out"}
          </Button>
        </div>
      ) : (
        <Button 
          onClick={handleSignIn}
          disabled={authInProgress || loading}
          className="flex items-center gap-2"
        >
          <FcGoogle className="h-5 w-5" />
          {authInProgress ? "Redirecting..." : "Sign in with Google"}
        </Button>
      )}
    </div>
  );
} 