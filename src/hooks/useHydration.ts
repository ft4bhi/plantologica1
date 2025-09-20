import { useEffect, useState } from 'react';

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

export function useCleanupBrowserExtensions() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanupExtensionAttributes = () => {
      // Remove common browser extension attributes that cause hydration mismatches
      const selectors = [
        '[bis_skin_checked]',
        '[data-v-app]',
        '[data-v-]',
        '[_ng]',
        '[data-cy]',
        '[data-testid]'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          // Remove attributes that start with common extension prefixes
          const attributes = Array.from(el.attributes);
          attributes.forEach(attr => {
            if (
              attr.name.startsWith('bis_') ||
              attr.name.startsWith('_ng') ||
              attr.name === 'data-v-app' ||
              attr.name.startsWith('data-v-') ||
              attr.name.startsWith('data-cy') ||
              attr.name.startsWith('data-testid')
            ) {
              el.removeAttribute(attr.name);
            }
          });
        });
      });
    };

    // Run cleanup after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', cleanupExtensionAttributes);
    } else {
      cleanupExtensionAttributes();
    }

    // Run cleanup periodically to catch dynamically added attributes
    const interval = setInterval(cleanupExtensionAttributes, 2000);

    return () => {
      clearInterval(interval);
      document.removeEventListener('DOMContentLoaded', cleanupExtensionAttributes);
    };
  }, []);
}
