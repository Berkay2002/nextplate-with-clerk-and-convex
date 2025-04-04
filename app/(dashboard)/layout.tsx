import { redirect } from 'next/navigation';
import { Navbar, Sidebar } from '@/components/shared';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for Supabase user
  const supabase = await createClient();
  const { data: { user: supabaseUser } } = await supabase.auth.getUser();
  
  // Redirect if not authenticated
  if (!supabaseUser) {
    return redirect('/');
  }

  return (
    <div className="relative min-h-screen">
      <Navbar variant="dashboard" />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 