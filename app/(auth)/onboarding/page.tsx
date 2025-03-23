import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const user = await currentUser();
  
  if (!user) return redirect('/sign-in');
  
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Complete Your Profile</h1>
      
      <form className="space-y-6">
        {/* Your onboarding form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            defaultValue={`${user.firstName || ''} ${user.lastName || ''}`.trim()}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        
        {/* More form fields as needed */}
        
        <button
          type="submit"
          className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
} 