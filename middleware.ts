import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

// Define public routes that don't require authentication
const isPublicRoute = (path: string): boolean => {
  const publicPaths = [
    '/',
    '/auth/callback',
    '/supabase-auth',
  ];
  
  // Check if the path starts with any of these
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon.ico') ||
    path.startsWith('/public') ||
    path.startsWith('/images')
  ) {
    return true;
  }
  
  // Check exact matches and patterns
  return publicPaths.some(publicPath => {
    if (publicPath.endsWith('(.*)')) {
      const basePath = publicPath.replace('(.*)', '');
      return path.startsWith(basePath);
    }
    return path === publicPath;
  });
};

export async function middleware(request: NextRequest) {
  console.log(`Middleware processing: ${request.nextUrl.pathname}`);
  
  // First, update the Supabase auth session
  const response = await updateSession(request);
  
  // If the request is for a public route, allow it through
  const path = request.nextUrl.pathname;
  if (isPublicRoute(path)) {
    console.log(`Public route detected: ${path}, allowing without auth check`);
    return response;
  }
  
  console.log(`Protected route detected: ${path}, checking authentication`);
  
  // For protected routes, check if the user is authenticated
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name)?.value;
          console.log(`Middleware reading cookie: ${name}, exists: ${!!cookie}`);
          return cookie;
        },
        set() {
          // Not used in middleware auth check
        },
        remove() {
          // Not used in middleware auth check
        },
      },
    }
  );
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    console.log(`Auth check result: ${user ? 'Authenticated' : 'Not authenticated'}`);
    
    if (!user) {
      // User is not authenticated, redirect to home page
      console.log('No user found, redirecting to home page');
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // User is authenticated, allow the request
    console.log(`User authenticated (${user.email}), allowing access to protected route`);
    return response;
  } catch (error) {
    console.error('Auth error:', error);
    // On error, redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
