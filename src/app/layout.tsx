import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plantologica",
  description:
    "Smart plant companion: compare real-time soil readings to optimal ranges and get care suggestions.",
};

import BottomNav from '@/components/BottomNav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        <div className="pb-16"> {/* Add padding to account for fixed bottom nav */}
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
