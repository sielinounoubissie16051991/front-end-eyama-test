import { AppNavbar } from "@/components/layout/app-navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f5f5f4,_#f8fafc)] text-slate-900">
      <AppNavbar />
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">{children}</main>
    </div>
  );
}
