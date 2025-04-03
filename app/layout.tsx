import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkClientProvider } from '@/components/providers/clerk-provider';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "2Cents - Image Arena",
  description: "A fast-paced, real-time multiplayer web game where players react to images by submitting witty captions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkClientProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkClientProvider>
  );
}
