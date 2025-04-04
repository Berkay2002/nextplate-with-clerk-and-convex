"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export function Navbar({ variant = 'dashboard' }: NavbarProps) {
  const isPublic = variant === 'public';
  const appName = isPublic ? "2cent" : "2cent";
  const homeLink = isPublic ? "/" : "/dashboard";
  const [authInProgress, setAuthInProgress] = useState(false);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const supabase = createClient();
  
  useEffect(() => {
    const checkSupabaseUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSupabaseUser(session?.user ?? null);
    };
    
    checkSupabaseUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setSupabaseUser(session?.user ?? null);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);
  
  const handleGoogleSignIn = async () => {
    try {
      setAuthInProgress(true);
      toast.info("Redirecting to Google...");
      
      // Get current site URL for redirect
      const redirectTo = `${window.location.origin}/auth/callback`;
      console.log("Using redirect URL for Navbar auth:", redirectTo);
      
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
      
      console.log("Navbar sign-in initiated:", data ? "Success" : "Failed", "URL:", data?.url);
      
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
  };
  
  const handleSupabaseSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Failed to sign out: " + error.message);
      } else {
        toast.success("Signed out successfully");
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("An error occurred while signing out");
    }
  };
  
  const getUserInitials = (email: string) => {
    return email.slice(0, 2).toUpperCase();
  };
  
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={homeLink} className="text-xl font-bold">
          {appName}
        </Link>
        
        {isPublic ? (
          <>
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleGoogleSignIn} 
                disabled={authInProgress} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <FcGoogle className="h-4 w-4" />
                {authInProgress ? "Redirecting..." : "Sign In with Google"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            {supabaseUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={supabaseUser.user_metadata?.avatar_url} alt="Profile" />
                      <AvatarFallback>{getUserInitials(supabaseUser.email || 'User')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{supabaseUser.user_metadata?.full_name || supabaseUser.email}</p>
                      <p className="text-xs leading-none text-muted-foreground">{supabaseUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSupabaseSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleGoogleSignIn}
              >
                Sign In
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
} 