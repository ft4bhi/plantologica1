'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the PlantsAnimation component with no SSR
const PlantsAnimation = dynamic(
  () => import('@/components/PlantsAnimation'),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <PlantsAnimation />
      {children}
    </>
  );
}
