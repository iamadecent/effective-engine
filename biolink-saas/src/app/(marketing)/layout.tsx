import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            BiolinkSaaS
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/pricing" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
            <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">Blog</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
                <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
                <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto py-8 text-center text-sm text-muted-foreground">
          © 2025 BiolinkSaaS. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MarketingLayout;
