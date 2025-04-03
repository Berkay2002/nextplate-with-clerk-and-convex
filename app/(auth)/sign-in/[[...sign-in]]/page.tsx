import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex h-[calc(100vh-56px)] items-center justify-center">
      <SignIn 
        appearance={{ 
          elements: { 
            formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90 text-sm normal-case' 
          } 
        }}
        redirectUrl="/dashboard"
      />
    </div>
  );
} 