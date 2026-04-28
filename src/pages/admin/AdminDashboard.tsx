import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Plus } from 'lucide-react';
import { listAllBandi, listAllEvents } from '@/lib/firestore-admin';

export default function AdminDashboard() {
  const [stats, setStats] = useState<{ events: number; bandi: number; published: number; activeBandi: number } | null>(null);

  useEffect(() => {
    Promise.all([listAllEvents(), listAllBandi()])
      .then(([ev, bd]) => {
        setStats({
          events: ev.length,
          bandi: bd.length,
          published: ev.filter((e) => e.published).length,
          activeBandi: bd.filter((b) => b.active).length,
        });
      })
      .catch(() => setStats({ events: 0, bandi: 0, published: 0, activeBandi: 0 }));
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10">
        <span className="mono-up text-gold">Dashboard</span>
        <h1 className="mt-4 font-display text-4xl">Benvenuto</h1>
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Eventi" value={stats?.events ?? '—'} />
        <StatCard label="Pubblicati" value={stats?.published ?? '—'} />
        <StatCard label="Bandi" value={stats?.bandi ?? '—'} />
        <StatCard label="Attivi" value={stats?.activeBandi ?? '—'} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ActionCard
          to="/admin/eventi"
          Icon={Calendar}
          title="Gestisci eventi"
          description="Crea, modifica e pubblica i concerti dell'orchestra"
        />
        <ActionCard
          to="/admin/bandi"
          Icon={FileText}
          title="Gestisci bandi"
          description="Crea e archivia i bandi delle masterclass"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-line bg-bg-soft p-6">
      <div className="text-xs tracking-[0.2em] text-fg-muted uppercase">{label}</div>
      <div className="mt-3 font-display text-4xl text-gold">{value}</div>
    </div>
  );
}

function ActionCard({
  to,
  Icon,
  title,
  description,
}: {
  to: string;
  Icon: typeof Calendar;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group block border border-line bg-bg-soft p-8 transition-colors hover:border-gold"
    >
      <Icon className="mb-4 text-gold" size={28} />
      <h2 className="mb-2 font-display text-2xl transition-colors group-hover:text-gold">{title}</h2>
      <p className="mb-6 text-sm text-fg-muted">{description}</p>
      <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-gold uppercase">
        <Plus size={14} /> Apri
      </span>
    </Link>
  );
}
