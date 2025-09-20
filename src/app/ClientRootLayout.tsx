'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ClientProviders = dynamic(
  () => import('@/components/ClientProviders'),
  { ssr: false, loading: () => null }
);

interface ClientRootLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function ClientRootLayout({ children, className = '' }: ClientRootLayoutProps) {
  return (
    <body className={className}>
      <ClientProviders>
        {children}
      </ClientProviders>
    </body>
  );
}
