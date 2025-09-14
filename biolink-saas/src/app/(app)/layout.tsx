import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, BarChart2, Settings, User } from 'lucide-react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-muted/40">
      <aside className="hidden md:flex md:flex-col md:w-64 bg-background border-r">
        <div className="p-4 border-b">
          <h2 className="font-bold text-2xl">BiolinkSaaS</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
            <Link href="/account/billing">
                <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Account & Billing
                </Button>
            </Link>
        </div>
      </aside>
      <div className="flex flex-col flex-grow">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
            {/* Mobile Nav would go here */}
            <div className="flex-grow"></div>
            {/* User Dropdown */}
        </header>
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
