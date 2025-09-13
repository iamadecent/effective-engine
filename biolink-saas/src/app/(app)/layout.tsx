import React from 'react';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-4">
          <h2 className="font-bold text-2xl">BiolinkSaaS</h2>
        </div>
        <nav className="p-4">
          {/* Links to Dashboard, Settings, Account, etc. */}
        </nav>
      </aside>
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
