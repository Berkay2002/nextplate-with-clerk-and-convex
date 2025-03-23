"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, LayoutDashboard, Users } from 'lucide-react';

interface Route {
  icon: React.ElementType;
  label: string;
  path: string;
}

const routes: Route[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Admin', path: '/admin' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-white dark:bg-gray-950 md:flex">
      <div className="flex flex-col space-y-2 p-4">
        {routes.map((route) => {
          const isActive = pathname === route.path;
          
          return (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
              }`}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
} 