import React from 'react';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto h-16 flex items-center justify-between">
          <span className="font-bold text-xl">BiolinkSaaS</span>
          <nav>
            {/* Links to pricing, blog, login */}
          </nav>
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
