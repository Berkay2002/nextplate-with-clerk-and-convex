import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Database, Lock, Palette } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Next<span className="text-primary">Plate</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A modern boilerplate with Next.js, Clerk authentication, shadcn/ui components, and Convex database.
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
          <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Lock className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Authentication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Secure authentication powered by Clerk with social logins, MFA, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Palette className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Modern UI Components</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Beautiful UI with shadcn/ui components, fully customizable with Tailwind CSS.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <Database className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Convex Database</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time database with automatic syncing, schemas, and type safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} NextPlate. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 