import { currentUser } from '@clerk/nextjs/server';
import { PageHeader, PageContainer } from '@/components/ui';

export default async function SettingsPage() {
  const user = await currentUser();
  
  return (
    <PageContainer>
      <PageHeader 
        title="Settings" 
        description={`Hello ${user?.firstName || 'User'}, manage your account settings here.`}
      />
      
      <div className="space-y-6">
        {/* Settings content goes here */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-medium">Account Preferences</h3>
          <p className="text-sm text-muted-foreground">Update your account settings and preferences</p>
        </div>
      </div>
    </PageContainer>
  );
} 