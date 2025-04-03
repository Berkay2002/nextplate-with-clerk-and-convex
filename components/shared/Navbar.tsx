"use client";

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export function Navbar({ variant = 'dashboard' }: NavbarProps) {
  const isPublic = variant === 'public';
  const appName = isPublic ? "NextPlate" : "My App";
  const homeLink = isPublic ? "/" : "/dashboard";
  
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={homeLink} className="text-xl font-bold">
          {appName}
        </Link>
        
        {isPublic ? (
          <>
            <nav className="hidden space-x-6 md:flex">
              <Link href="#features" className="text-sm font-medium hover:text-primary">
                Features
              </Link>
              <Link href="#docs" className="text-sm font-medium hover:text-primary">
                Documentation
              </Link>
              <Link href="https://github.com/your-username/nextplate" target="_blank" className="text-sm font-medium hover:text-primary">
                GitHub
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </header>
  );
} 