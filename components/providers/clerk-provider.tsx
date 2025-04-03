'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

interface ClerkProviderProps {
  children: ReactNode;
}

export function ClerkClientProvider({ children }: ClerkProviderProps) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
} 