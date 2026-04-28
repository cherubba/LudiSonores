import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Field, Switch, TextArea, TextInput } from '@/components/admin/FormFields';
import { FileUploader } from '@/components/admin/FileUploader';
import { createBando, getBandoById, updateBando, type BandoInput } from '@/lib/firestore-admin';
import { slugify } from '@/lib/storage';

interface FormState {
  title: string;
  year: string;
  description: string;
  pdfUrl: string;
  active: boolean;
  slug: string;
  slugLocked: boolean;
}

const EMPTY: FormState = {
  title: '',
  year: String(new Date().getFullYear()),
  description: '',
  pdfUrl: '',
  active: true,
  slug: '',
  slugLocked: false,
};

export default function BandoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [state, setState] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getBandoById(id)
      .then((doc) => {
        if (!doc) {
          setError('Bando non trovato');
          return;
        }
        setState({
          title: doc.title,
          year: String(doc.year),
          description: doc.description,
          pdfUrl: doc.pdfUrl,
          active: doc.active,
          slug: doc.slug,
          slugLocked: true,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const titleSlug = useMemo(() => slugify(state.title), [state.title]);
  useEffect(() => {
    if (!state.slugLocked && titleSlug) {
      setState((s) => ({ ...s, slug: titleSlug }));
    }
  }, [titleSlug, state.slugLocked]);

  function patch<K extends keyof FormState>(key: K, val: FormState[K]) {
    setState((s) => ({ ...s, [key]: val }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (!state.slug) throw new Error('Slug obbligatorio');
      if (!state.pdfUrl) throw new Error('PDF del bando obbligatorio');
      const yearNum = parseInt(state.year, 10);
      if (Number.isNaN(yearNum)) throw new Error('Anno non valido');

      const input: BandoInput = {
        title: state.title.trim(),
        year: yearNum,
        description: state.description.trim(),
        pdfUrl: state.pdfUrl,
        active: state.active,
        slug: state.slug,
      };

      if (isEdit && id) {
        await updateBando(id, input);
      } else {
        await createBando(input);
      }
      navigate('/admin/bandi');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di salvataggio');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-fg-muted">Caricamento...</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/admin/bandi"
        className="mb-6 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-fg-muted uppercase transition-colors hover:text-gold"
      >
        <ArrowLeft size={14} /> Torna alla lista
      </Link>

      <h1 className="mb-10 font-display text-4xl">
        {isEdit ? 'Modifica bando' : 'Nuovo bando'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field label="Titolo" required>
          <TextInput
            required
            value={state.title}
            onChange={(e) => patch('title', e.target.value)}
            placeholder="Es. Bando Masterclass di Violino 2026"
          />
        </Field>

        <Field label="Anno" required>
          <TextInput
            type="number"
            required
            min={2000}
            max={2099}
            value={state.year}
            onChange={(e) => patch('year', e.target.value)}
          />
        </Field>

        <Field label="Descrizione" hint="Testo introduttivo nel dettaglio bando.">
          <TextArea
            rows={6}
            value={state.description}
            onChange={(e) => patch('description', e.target.value)}
          />
        </Field>

        <Field
          label="Slug URL"
          hint="Generato dal titolo. Cambialo se vuoi un URL specifico."
          required
        >
          <TextInput
            required
            value={state.slug}
            onChange={(e) => {
              patch('slug', slugify(e.target.value));
              patch('slugLocked', true);
            }}
            disabled={isEdit}
          />
        </Field>

        <FileUploader
          folder={`bandi/${state.slug || 'tmp'}`}
          currentUrl={state.pdfUrl}
          accept="application/pdf"
          label="PDF del bando *"
          preview="pdf"
          onUploaded={(url) => patch('pdfUrl', url)}
          onRemoved={() => patch('pdfUrl', '')}
        />

        <div className="border-t border-line pt-6">
          <Switch
            checked={state.active}
            onChange={(v) => patch('active', v)}
            label="Iscrizioni aperte"
            hint="Se disattivato, il bando finisce nell'archivio (non sparisce)."
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-line pt-6">
          <Link to="/admin/bandi">
            <Button variant="ghost" type="button">
              Annulla
            </Button>
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Salvataggio...' : isEdit ? 'Salva modifiche' : 'Crea bando'}
          </Button>
        </div>
      </form>
    </div>
  );
}
