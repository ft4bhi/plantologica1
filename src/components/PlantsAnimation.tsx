'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import type { PlantsAnimationConfig } from '@/types/window';

declare global {
  interface Window {
    initPlantsAnimation?: (config: PlantsAnimationConfig) => void;
  }
}

export default function PlantsAnimation() {
  const animationInitialized = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const config: PlantsAnimationConfig = {
      container: 'growing-plants-animation',
      color1: '#10b981', // emerald-500
      color2: '#059669', // emerald-600
      particleCount: 30,
    };
    
    const initAnimation = () => {
      if (window.initPlantsAnimation && !animationInitialized.current) {
        try {
          window.initPlantsAnimation(config);
          animationInitialized.current = true;
        } catch (error) {
          console.error('Error initializing plants animation:', error);
        }
      }
    };

    // Handle script load
    const handleScriptLoad = () => {
      initAnimation();
    };

    // Check if script is already loaded
    if (window.initPlantsAnimation) {
      initAnimation();
    } else {
      window.addEventListener('plantsAnimationLoaded', initAnimation);
    }

    // Cleanup
    return () => {
      window.removeEventListener('plantsAnimationLoaded', initAnimation);
      // Additional cleanup if needed
      const container = document.getElementById('growing-plants-animation');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10" suppressHydrationWarning>
      <div id="growing-plants-animation" className="h-full w-full opacity-20" />
      <Script 
        id="plants-animation-script"
        src="/growing-plants-animation/dist/script.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event('plantsAnimationLoaded'));
        }}
      />
    </div>
  );
}
