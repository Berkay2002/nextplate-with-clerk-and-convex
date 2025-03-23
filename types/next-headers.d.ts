// Declaration file to extend Next.js headers types
import 'next/headers';

declare module 'next/headers' {
  function headers(): Headers;
}

interface Headers {
  get(name: string): string | null;
} 