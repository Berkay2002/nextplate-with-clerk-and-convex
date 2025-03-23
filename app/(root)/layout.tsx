import { Navbar } from "@/components/shared";

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar variant="public" />
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 