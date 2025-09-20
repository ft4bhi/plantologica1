'use client';
import dynamic from 'next/dynamic';
import { Suspense, ReactNode } from 'react';

// Dynamically import BackgroundPlants with no SSR
const BackgroundPlants = dynamic(
  () => import('./BackgroundPlants'),
  { 
    ssr: false,
    loading: () => null
  }
);

interface BackgroundPlantsWrapperProps {
  children?: ReactNode;
}

export default function BackgroundPlantsWrapper({ children }: BackgroundPlantsWrapperProps) {
  return (
    <>
      <Suspense fallback={null}>
        <BackgroundPlants />
      </Suspense>
      {children}
    </>
  );
}
