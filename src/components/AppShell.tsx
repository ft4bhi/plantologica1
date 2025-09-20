"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  ScanLine, 
  BookOpen, 
  Settings, 
  Search, 
  Leaf,
  Droplets,
  Sun,
  LucideIcon 
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active: boolean;
}

// Modern Plant App Styles
const plantAppStyles = `
  /* Custom scrollbar for plant theme */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(139, 195, 74, 0.1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, var(--green-400), var(--green-600));
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--green-500), var(--green-700));
  }

  /* Plant-themed animations */
  @keyframes plantGrow {
    0% { transform: scale(0.8) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }

  @keyframes leafSway {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }

  .plant-grow {
    animation: plantGrow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .leaf-sway {
    animation: leafSway 3s ease-in-out infinite;
  }

  /* Modern focus states */
  .focus-visible {
    outline: 2px solid var(--green-400);
    outline-offset: 2px;
  }

  /* Plant icon animations */
  .plant-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .plant-icon:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = plantAppStyles;
  document.head.appendChild(styleElement);
}

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppShell({ children, title = 'Plantologica' }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-nav border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-2xl glass-plant flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600 plant-icon" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-800">
                    {title}
                  </h1>
                  <p className="text-xs text-green-600/70 font-medium">Plant Care Companion</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="btn btn-ghost p-2 rounded-xl">
                <Search className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full glass-plant flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold">
                  U
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 sm:pb-0 sm:pl-20 2xl:pl-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="glass-strong rounded-3xl p-8 plant-grow">
            {children}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <BottomNav />
    </div>
  );
}

const BottomNav = () => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Modern plant app navigation
  const mobileNavClasses = `
    fixed bottom-0 left-0 right-0 z-50 sm:hidden
    glass-nav border-t border-white/20
    shadow-[0_-8px_32px_rgba(26,46,34,0.08)]
  `;

  const NavItem = React.memo(function NavItem({ 
    href, 
    icon: Icon, 
    label, 
    active: isActive = false 
  }: NavItemProps & { active?: boolean }) {
    const [mounted, setMounted] = React.useState(false);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const active = isActive || pathname === href;
    
    // Set mounted state on client
    React.useEffect(() => {
      setMounted(true);
      
      // Clean up browser extension attributes after mount
      const cleanAttributes = (el: Element) => {
        if (!el || !el.attributes) return;
        
        const attributes = Array.from(el.attributes);
        for (const attr of attributes) {
          if (attr.name.startsWith('bis_') || 
              attr.name.startsWith('_ng') ||
              attr.name === 'data-v-app' ||
              attr.name.startsWith('data-v-') ||
              attr.name.startsWith('data-')) {
            el.removeAttribute(attr.name);
          }
        }
      };

      const cleanup = () => {
        if (elementRef.current) {
          cleanAttributes(elementRef.current);
          elementRef.current.querySelectorAll('*').forEach(cleanAttributes);
        }
      };
      
      // Initial cleanup
      cleanup();
      
      // Cleanup on DOM mutations
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            if (mutation.target instanceof Element) {
              cleanAttributes(mutation.target);
            }
          } else if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof Element) {
                cleanAttributes(node);
                node.querySelectorAll('*').forEach(cleanAttributes);
              }
            });
          }
        });
      });
      
      if (elementRef.current) {
        observer.observe(elementRef.current, {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ['data-*', 'bis_*', '_ng*']
        });
      }
      
      return () => observer.disconnect();
    }, []);
    
    // Don't render anything on server
    if (!mounted) {
      return (
        <div className="w-full py-3 flex flex-col items-center justify-center text-sm font-medium text-transparent">
          <div className="p-2 rounded-xl mb-1">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-0.5">...</span>
        </div>
      );
    }
    
    return (
      <div ref={elementRef} className="w-full px-2">
        <Link 
          href={href}
          className={`relative w-full py-3 flex flex-col items-center justify-center 
            text-sm font-medium transition-all duration-300 group ${
              active 
                ? 'text-green-700' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          title={label}
          suppressHydrationWarning
        >
          <div 
            className={`p-3 rounded-2xl mb-2 transition-all duration-300 ${
              active 
                ? 'glass-plant shadow-lg scale-105' 
                : 'glass-subtle hover:glass-plant group-hover:scale-105'
            }`}
          >
            <Icon 
              className={`h-5 w-5 transition-all duration-300 plant-icon ${
                active ? 'scale-110 text-green-600' : 'text-gray-600 group-hover:text-green-600'
              }`} 
            />
          </div>
          <span className={`text-xs font-medium transition-colors ${
            active ? 'text-green-700 font-semibold' : 'text-gray-600 group-hover:text-green-700'
          }`}>
            {label}
          </span>
          {active && (
            <div className="absolute -inset-1 bg-green-500/10 rounded-2xl -z-10" />
          )}
        </Link>
      </div>
    );
  });

  const SidebarItem = ({ href, icon: Icon, label, active }: SidebarItemProps) => {
    return (
      <Link 
        href={href}
        className={`group relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
          active 
            ? 'text-green-700' 
            : 'text-gray-600 hover:text-green-700'
        }`}
        title={label}
      >
        <div className={`p-3 rounded-2xl transition-all duration-300 ${
          active 
            ? 'glass-plant shadow-lg scale-105' 
            : 'glass-subtle group-hover:glass-plant group-hover:scale-105'
        }`}>
          <Icon 
            className={`h-5 w-5 transition-all duration-300 plant-icon ${
              active ? 'scale-110 text-green-600' : 'text-gray-600 group-hover:text-green-600'
            }`} 
          />
        </div>
        <span className={`mt-2 text-xs font-medium transition-all ${
          active 
            ? 'text-green-700 font-semibold' 
            : 'text-gray-600 group-hover:text-green-700'
        }`}>
          {label}
        </span>
        {active && (
          <div className="absolute -inset-1 bg-green-500/10 rounded-2xl -z-10" />
        )}
      </Link>
    );
  };

  const navItems = React.useMemo(() => [
    { href: '/', label: 'Home', icon: Home },
    { href: '/library', label: 'Plants', icon: Leaf },
    { href: '/scan', label: 'Scan', icon: ScanLine },
    { href: '/settings', label: 'Settings', icon: Settings },
  ], []);

  const sidebarItems = React.useMemo(() => [
    { href: '/', label: 'Home', icon: Home },
    { href: '/library', label: 'Plants', icon: Leaf },
    { href: '/scan', label: 'Scan', icon: ScanLine },
    { href: '/settings', label: 'Settings', icon: Settings },
  ], []);

  return (
    <>
      {/* Mobile Navigation */}
      <nav className={mobileNavClasses}>
        <div className="relative max-w-md mx-auto">
          <div className="relative flex items-center justify-around px-3 py-4 mx-4 mb-4">
            <div className="absolute inset-0 glass-nav rounded-3xl shadow-lg" />
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                             (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <NavItem 
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={isActive}
                />
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden sm:flex fixed left-0 top-0 bottom-0 w-20 2xl:w-24 glass-nav flex-col items-center py-6 z-40 border-r border-white/20">
        <div className="flex-1 flex flex-col items-center space-y-6 w-full">
          <Link href="/" className="w-full flex justify-center mb-4">
            <div className="h-12 w-12 rounded-2xl glass-plant flex items-center justify-center group hover:scale-105 transition-transform">
              <Leaf className="h-7 w-7 text-green-600 plant-icon group-hover:rotate-12" />
            </div>
          </Link>
          
          <div className="w-full space-y-2 px-2">
            {sidebarItems.map((item) => (
              <SidebarItem 
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href || 
                       (item.href !== '/' && pathname.startsWith(item.href))}
              />
            ))}
          </div>
        </div>
        
        <div className="w-full space-y-2 px-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
            className="w-full py-3 flex flex-col items-center text-gray-600 hover:text-green-700 rounded-2xl transition-all duration-300 group"
            aria-label="Search plants"
          >
            <div className="p-3 rounded-2xl glass-subtle group-hover:glass-plant group-hover:scale-105 transition-all duration-300">
              <Search className="h-5 w-5 plant-icon" />
            </div>
            <span className="text-xs mt-2 font-medium group-hover:text-green-700 transition-colors">Search</span>
          </button>
          <SidebarItem 
            href="/settings" 
            icon={Settings} 
            label="Settings" 
            active={pathname === '/settings'}
          />
        </div>
      </nav>
    </>
  );
};

// ... (rest of the code remains the same)
