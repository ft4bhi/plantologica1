'use client';
import { useEffect, useState } from 'react';

export default function BackgroundPlants() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Set mounted state
    setIsMounted(true);

    // Load CSS
    const styleId = 'growing-style';
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = '/growing/style.css';
      document.head.appendChild(link);
    }

    // Load script
    const scriptId = 'growing-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '/growing/script.js';
      script.async = true;
      document.body.appendChild(script);

      // Cleanup function
      return () => {
        const scriptElement = document.getElementById(scriptId);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
      };
    }
  }, []);

  // Don't render anything on the server
  if (!isMounted) {
    return null;
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div id="canvas_container_div" className="h-full w-full grid place-items-center">
        <canvas id="canvas" width={1000} height={1000} />
      </div>
    </div>
  );
}
