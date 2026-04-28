import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { deleteBando, listAllBandi } from '@/lib/firestore-admin';
import type { BandoDoc } from '@/types/firestore';

export default function BandiListPage() {
  const [items, setItems] = useState<Array<BandoDoc & { id: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await listAllBandi();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Eliminare definitivamente "${title}"?`)) return;
    setDeleting(id);
    try {
      await deleteBando(id);
      await load();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mono-up text-gold">Formazione</span>
          <h1 className="mt-4 font-display text-4xl">Bandi</h1>
        </div>
        <Link to="/admin/bandi/new">
          <Button>
            <Plus size={16} /> Nuovo bando
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-fg-muted">Caricamento...</p>
      ) : items.length === 0 ? (
        <p className="text-fg-muted">Nessun bando. Creane uno con il pulsante in alto.</p>
      ) : (
        <div className="border border-line">
          {items.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-1 gap-3 border-b border-line p-4 last:border-b-0 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-6 md:p-5"
            >
              <div>
                <div className="font-display text-lg">{it.title}</div>
                <div className="mt-1 text-xs text-fg-muted">Anno {it.year}</div>
              </div>
              <div className="text-sm text-fg-muted">
                {it.pdfUrl ? (
                  <a
                    href={it.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    PDF
                  </a>
                ) : (
                  '—'
                )}
              </div>
              <span
                className={`inline-block px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase ${
                  it.active ? 'border border-gold-soft text-gold' : 'border border-line text-fg-muted'
                }`}
              >
                {it.active ? 'Attivo' : 'Archivio'}
              </span>
              <div className="flex gap-2">
                <Link
                  to={`/admin/bandi/${it.id}/edit`}
                  className="cursor-pointer p-2 text-fg-muted transition-colors hover:text-gold"
                  aria-label="Modifica"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(it.id, it.title)}
                  disabled={deleting === it.id}
                  className="cursor-pointer p-2 text-fg-muted transition-colors hover:text-red-400 disabled:opacity-50"
                  aria-label="Elimina"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
