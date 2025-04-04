import { createClient } from '@/utils/supabase/server';

export default async function SettingsPage() {
  // Get user profile from Supabase
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="rounded-lg border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Profile</h2>
          <p className="text-sm text-muted-foreground mb-4">Manage your account settings and preferences.</p>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            
            <div>
              <p className="font-medium">Name</p>
              <p className="text-muted-foreground">{user?.user_metadata?.full_name || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 