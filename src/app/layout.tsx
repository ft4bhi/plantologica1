import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { PlantProvider } from "@/context/PlantContext";
import { Providers } from "@/components/Providers";
import PlantsBackground from "@/components/PlantsBackground";
import HydrationCleanup from "@/components/HydrationCleanup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plantologica",
  description:
    "Smart plant companion: compare real-time soil readings to optimal ranges and get care suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body 
        suppressHydrationWarning
        className={`${inter.variable} min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100`}
      >
        <HydrationCleanup />
        <PlantsBackground />
        <Providers>
          <PlantProvider>
            <div className="relative z-10 min-h-screen backdrop-blur-sm">
              <AppShell>
                {children}
              </AppShell>
            </div>
          </PlantProvider>
        </Providers>
      </body>
    </html>
  );
}
