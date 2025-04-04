import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
  // Get the user information from Supabase
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user?.user_metadata?.full_name || user?.email || 'User'}!</p>
      
      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
        <p className="text-muted-foreground">
          This is your dashboard homepage. You can customize this page to display 
          relevant information for your users.
        </p>
      </div>
    </div>
  );
} 