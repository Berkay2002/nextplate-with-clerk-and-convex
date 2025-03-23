import { PageHeader, PageContainer } from '@/components/ui';

export default async function AdminPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Admin" 
        description="Manage your application's resources"
      />
      
      <div className="space-y-6">
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-medium">User Management</h3>
          <p className="text-sm text-muted-foreground">
            <a href="/admin/users" className="text-primary hover:underline">Manage users</a>
          </p>
        </div>
      </div>
    </PageContainer>
  );
} 