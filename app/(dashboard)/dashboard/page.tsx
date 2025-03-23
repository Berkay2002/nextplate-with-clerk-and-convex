import { currentUser } from '@clerk/nextjs/server';
import { PageHeader, PageContainer } from '@/components/ui';

export default async function DashboardPage() {
  const user = await currentUser();
  
  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard" 
        description={`Welcome, ${user?.firstName || 'User'}!`}
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard cards and content go here */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-medium">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
        </div>
      </div>
    </PageContainer>
  );
} 