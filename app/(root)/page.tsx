import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Image, MessageSquare, Trophy } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  // Check if user is authenticated
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // If authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          2<span className="text-primary">Cents</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A fast-paced, real-time multiplayer web game where players react to images by submitting witty, absurd, or clever captions.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/sign-in">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-muted-foreground">Jump into the game and start earning!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Images</h3>
              <p className="text-muted-foreground">Upload your favorite memes or create new ones. Let&apos;s see what you got!</p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <MessageSquare className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">React & Vote</h3>
              <p className="text-muted-foreground">
                Players submit witty captions for each image and vote on others&apos; submissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Trophy className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Win & Compete</h3>
              <p className="text-muted-foreground">
                The caption with the most votes wins each round, and images gain popularity over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} 2Cents. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 