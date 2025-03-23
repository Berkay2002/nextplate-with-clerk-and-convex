"use client";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

type User = {
  name?: string;
  email: string;
  onboardingCompleted: boolean;
};

export default function UserProfileComponent() {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // In a real implementation, you would use the Convex hooks:
  // const user = useQuery(api.users.getUser, userId ? { userId } : "skip");
  // const updateUser = useMutation(api.users.createOrUpdateUser);
  
  // Example function to update user profile
  const handleUpdateProfile = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // This is a mock update - in a real implementation, you would use Convex
      // await updateUser({
      //   userId,
      //   email: "updated-email@example.com",
      //   name: "Updated Name",
      // });
      
      // For now, we're just updating the local state
      setUser({
        name: "Updated Name",
        email: "updated-email@example.com",
        onboardingCompleted: true
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!userId) {
    return <div>Not authenticated</div>;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">User Profile</h2>
      
      {user ? (
        <div>
          <p>Name: {user.name || "Not set"}</p>
          <p>Email: {user.email}</p>
          <p>Onboarding completed: {user.onboardingCompleted ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>User data not loaded. Once Convex is properly connected, user data will appear here.</p>
      )}
      
      <Button onClick={handleUpdateProfile} disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
} 