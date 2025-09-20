'use client';

import { ReactNode, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const PlantProvider = dynamic(
  () => import('@/context/PlantContext').then(mod => mod.PlantProvider),
  { ssr: false }
);

const PlantsBackground = dynamic(
  () => import('./PlantsBackground'),
  { ssr: false, loading: () => null }
);

const AppShell = dynamic(
  () => import('./AppShell'),
  { ssr: false, loading: () => null }
);

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <PlantsBackground />
      <PlantProvider>
        <div className="relative z-10 min-h-screen backdrop-blur-sm">
          <AppShell>
            {children}
          </AppShell>
        </div>
      </PlantProvider>
    </>
  );
}
