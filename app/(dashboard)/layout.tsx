import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Navbar, Sidebar } from '@/components/shared';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  if (!user) return redirect('/sign-in');

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