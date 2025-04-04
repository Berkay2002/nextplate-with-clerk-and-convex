import { SupabaseGoogleAuth } from "@/components/shared/SupabaseAuth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SupabaseAuthPage() {
  // Check if user is authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // If authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Supabase Google Authentication</h1>
        <p className="text-center text-muted-foreground">
          Sign in with your Google account using Supabase authentication
        </p>
        
        <div className="w-full max-w-xs">
          <SupabaseGoogleAuth />
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>After you sign in, you will be redirected to the dashboard</p>
        </div>
      </div>
    </div>
  );
} 