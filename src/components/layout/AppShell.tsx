import { Header, Sidebar, MobileBottomNav } from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 md:mt-16 pb-20 md:pb-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {children}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}
