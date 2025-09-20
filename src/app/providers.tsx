"use client";
import { PlantProvider } from "../context/PlantContext";
import BackgroundPlants from "../components/BackgroundPlantsWrapper";
import { useEffect, useCallback } from 'react';

type AttributePattern = RegExp | string;

// List of attribute patterns to remove
const ATTRIBUTE_PATTERNS: AttributePattern[] = [
  /^bis_/, 
  /^_ngcontent-/, 
  /^_nghost-/, 
  /^data-v-/, 
  'data-testid',
  'data-hydrated'
];

// List of elements that should have suppressHydrationWarning
const ELEMENTS_TO_SUPPRESS = ['html', 'body', 'div', 'span', 'a', 'button', 'input'] as const;

// Convert RegExp patterns to strings for attribute filtering
const getStringPatterns = (patterns: AttributePattern[]): string[] => {
  return patterns
    .filter((p): p is string => typeof p === 'string')
    .concat(patterns
      .filter((p): p is RegExp => p instanceof RegExp)
      .map(regex => regex.source.replace(/^\^|\$$/g, ''))
    );
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const cleanElementAttributes = useCallback((element: Element) => {
    if (!(element instanceof HTMLElement)) return;
    
    // Remove problematic attributes
    const attributes = Array.from(element.attributes);
    attributes.forEach(attr => {
      const shouldRemove = ATTRIBUTE_PATTERNS.some(pattern => 
        typeof pattern === 'string' 
          ? attr.name === pattern 
          : pattern.test(attr.name)
      );
      
      if (shouldRemove) {
        element.removeAttribute(attr.name);
      }
    });

    // Add suppress hydration warning to common interactive elements
    if (ELEMENTS_TO_SUPPRESS.includes(element.tagName.toLowerCase() as typeof ELEMENTS_TO_SUPPRESS[number])) {
      element.setAttribute('suppressHydrationWarning', 'true');
    }
  }, []);

  // Clean the entire document
  const cleanDocument = useCallback(() => {
    if (typeof document === 'undefined') return;
    
    // Clean document and body first
    [document.documentElement, document.body].forEach(el => {
      cleanElementAttributes(el);
      el.setAttribute('suppressHydrationWarning', 'true');
    });

    // Clean all elements in the document
    const allElements = document.querySelectorAll('*');
    allElements.forEach(cleanElementAttributes);
  }, [cleanElementAttributes]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Initial cleanup
    cleanDocument();

    // Set up MutationObserver to clean dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              cleanElementAttributes(node as Element);
              // Also clean all child elements
              (node as Element).querySelectorAll('*').forEach(cleanElementAttributes);
            }
          });
        } else if (mutation.type === 'attributes' && mutation.target) {
          cleanElementAttributes(mutation.target as Element);
        }
      });
    });

    // Start observing the document
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: getStringPatterns(ATTRIBUTE_PATTERNS).concat(['class', 'style'])
    });

    // Cleanup function
    return () => observer.disconnect();
  }, [cleanDocument, cleanElementAttributes]);

  return (
    <PlantProvider>
      <BackgroundPlants>
        {children}
      </BackgroundPlants>
    </PlantProvider>
  );
}
