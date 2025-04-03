import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Image, MessageSquare, Trophy } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          2<span className="text-primary">Cents</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
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
      <div className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Image className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Submit Images</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every player submits one image per game, creating a unique image pool for each session.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <MessageSquare className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">React & Vote</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Players submit witty captions for each image and vote on others' submissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Trophy className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Win & Compete</h3>
              <p className="text-gray-600 dark:text-gray-400">
                The caption with the most votes wins each round, and images gain popularity over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} 2Cents. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 