import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`container mx-auto max-w-7xl p-4 md:p-6 ${className}`}>
      {children}
    </div>
  );
} 