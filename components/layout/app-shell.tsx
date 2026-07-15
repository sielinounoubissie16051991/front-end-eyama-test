import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f5f5f4,_#f8fafc)] text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">
              Heyama
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Gestion des objets
            </h1>
          </div>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link href="/" className="transition hover:text-slate-950">
              Accueil
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">{children}</main>
    </div>
  );
}
