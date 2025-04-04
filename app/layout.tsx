import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from '@/components/providers/toast-provider';
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
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
