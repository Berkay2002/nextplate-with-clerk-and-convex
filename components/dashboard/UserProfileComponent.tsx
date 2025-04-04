"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  name?: string;
  email: string;
  onboardingCompleted: boolean;
};

export default function UserProfileComponent() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const supabase = createClient();
  
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      
      try {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser();
        
        if (supabaseUser) {
          // Set up the user profile
          setUser({
            name: supabaseUser.user_metadata?.full_name,
            email: supabaseUser.email || '',
            onboardingCompleted: true,
          });
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, [supabase.auth]);
  
  // Example function to update user profile
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // In a real implementation, you would update the user metadata in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: "Updated Name",
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Update the local state
      setUser({
        name: "Updated Name",
        email: user.email,
        onboardingCompleted: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !user) {
    return <div>Loading profile...</div>;
  }
  
  if (!user) {
    return <div>Not authenticated</div>;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">User Profile</h2>
      
      <div>
        <p>Name: {user.name || "Not set"}</p>
        <p>Email: {user.email}</p>
        <p>Onboarding completed: {user.onboardingCompleted ? "Yes" : "No"}</p>
      </div>
      
      <Button onClick={handleUpdateProfile} disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
} 