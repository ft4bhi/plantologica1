"use client";
import { useCleanupBrowserExtensions } from '@/hooks/useHydration';

export default function HydrationCleanup() {
  useCleanupBrowserExtensions();
  return null;
}
