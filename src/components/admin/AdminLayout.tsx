import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, FileText, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/eventi', label: 'Eventi', Icon: Calendar, end: false },
  { to: '/admin/bandi', label: 'Bandi', Icon: FileText, end: false },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-bg text-fg">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-bg-soft transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-6">
          <Link to="/admin" className="flex items-center gap-3">
            <img src="/img/logo.png" alt="" className="h-8" />
            <span className="font-display text-sm uppercase tracking-[0.15em]">Admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="cursor-pointer p-2 lg:hidden"
            aria-label="Chiudi menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {NAV.map(({ to, label, Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 text-sm transition-colors',
                      isActive
                        ? 'bg-bg-elev text-gold'
                        : 'text-fg-muted hover:bg-bg-elev hover:text-fg',
                    )
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <div className="mb-3 px-2 text-xs">
            <div className="text-fg-muted">Connesso come</div>
            <div className="mt-1 truncate text-fg">{user?.email}</div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-fg-muted transition-colors hover:bg-bg-elev hover:text-fg"
          >
            <LogOut size={18} /> Esci
          </button>
          <Link
            to="/"
            className="mt-2 block px-4 py-2 text-center text-xs tracking-[0.15em] text-fg-muted uppercase transition-colors hover:text-gold"
          >
            ← Vai al sito
          </Link>
        </div>
      </aside>

      <div
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div className="flex flex-1 flex-col lg:ml-72">
        <header className="flex h-16 items-center justify-between border-b border-line bg-bg-soft px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer p-2"
            aria-label="Apri menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-display text-sm uppercase tracking-[0.15em]">Admin</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
