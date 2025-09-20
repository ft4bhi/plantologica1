'use client';

import { Home, Scan, Search, BookOpen, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
};

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Scan', icon: Scan, path: '/scan' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Library', icon: BookOpen, path: '/library' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`p-2 rounded-full ${
                isActive ? 'bg-green-50' : ''
              }`}>
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                />
              </div>
              <span className="text-xs mt-0.5">{item.name}</span>
              {isActive && (
                <div className="h-1 w-1/2 bg-green-500 rounded-full mt-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
