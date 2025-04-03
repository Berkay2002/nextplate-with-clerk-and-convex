"use client";

import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  variant?: 'public' | 'dashboard';
}

export function Navbar({ variant = 'dashboard' }: NavbarProps) {
  const isPublic = variant === 'public';
  const appName = isPublic ? "2cent" : "2cent";
  const homeLink = isPublic ? "/" : "/dashboard";
  
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={homeLink} className="text-xl font-bold">
          {appName}
        </Link>
        
        {isPublic ? (
          <>
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