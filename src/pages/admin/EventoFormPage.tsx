import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Field, Switch, TextArea, TextInput } from '@/components/admin/FormFields';
import { FileUploader } from '@/components/admin/FileUploader';
import { createEvent, getEventById, updateEvent, type EventInput } from '@/lib/firestore-admin';
import { slugify } from '@/lib/storage';

interface FormState {
  title: string;
  venue: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  description: string;
  programmeText: string;
  imageUrl: string;
  slug: string;
  published: boolean;
  slugLocked: boolean;
}

const EMPTY: FormState = {
  title: '',
  venue: '',
  date: '',
  time: '20:30',
  description: '',
  programmeText: '',
  imageUrl: '',
  slug: '',
  published: true,
  slugLocked: false,
};

export default function EventoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [state, setState] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then((doc) => {
        if (!doc) {
          setError('Evento non trovato');
          return;
        }
        const d = doc.date.toDate();
        setState({
          title: doc.title,
          venue: doc.venue,
          date: d.toISOString().slice(0, 10),
          time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
          description: doc.description,
          programmeText: (doc.programme || []).join('\n'),
          imageUrl: doc.imageUrl,
          slug: doc.slug,
          published: doc.published,
          slugLocked: true,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Auto-genera slug dal titolo finché non è stato editato manualmente
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
      if (!state.imageUrl) throw new Error("Immagine di copertina obbligatoria");
      const [h, m] = state.time.split(':').map((x) => parseInt(x, 10));
      const dateObj = new Date(state.date);
      dateObj.setHours(h || 0, m || 0, 0, 0);

      const input: EventInput = {
        title: state.title.trim(),
        venue: state.venue.trim() || 'Roma',
        date: dateObj,
        description: state.description.trim(),
        programme: state.programmeText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        imageUrl: state.imageUrl,
        slug: state.slug,
        published: state.published,
      };

      if (isEdit && id) {
        await updateEvent(id, input);
      } else {
        await createEvent(input);
      }
      navigate('/admin/eventi');
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
        to="/admin/eventi"
        className="mb-6 inline-flex items-center gap-2 text-xs tracking-[0.15em] text-fg-muted uppercase transition-colors hover:text-gold"
      >
        <ArrowLeft size={14} /> Torna alla lista
      </Link>

      <h1 className="mb-10 font-display text-4xl">
        {isEdit ? 'Modifica evento' : 'Nuovo evento'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field label="Titolo" required>
          <TextInput
            required
            value={state.title}
            onChange={(e) => patch('title', e.target.value)}
            placeholder="Es. Le Quattro Stagioni"
          />
        </Field>

        <Field label="Sede">
          <TextInput
            value={state.venue}
            onChange={(e) => patch('venue', e.target.value)}
            placeholder="Es. Sala Baldini, Roma"
          />
        </Field>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Data" required>
            <TextInput
              type="date"
              required
              value={state.date}
              onChange={(e) => patch('date', e.target.value)}
            />
          </Field>
          <Field label="Orario">
            <TextInput
              type="time"
              value={state.time}
              onChange={(e) => patch('time', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Descrizione" hint="Testo che appare nel dettaglio evento.">
          <TextArea
            rows={4}
            value={state.description}
            onChange={(e) => patch('description', e.target.value)}
            placeholder="Antonio Vivaldi: Le Quattro Stagioni..."
          />
        </Field>

        <Field
          label="Programma"
          hint="Una voce per riga (es. solisti, brani, direttore)."
        >
          <TextArea
            rows={6}
            value={state.programmeText}
            onChange={(e) => patch('programmeText', e.target.value)}
            placeholder={'Concerto n.1 - La Primavera\nDirettore: Andrea Rossi'}
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
          folder={`events/${state.slug || 'tmp'}`}
          currentUrl={state.imageUrl}
          accept="image/*"
          label="Immagine di copertina *"
          onUploaded={(url) => patch('imageUrl', url)}
          onRemoved={() => patch('imageUrl', '')}
        />

        <div className="border-t border-line pt-6">
          <Switch
            checked={state.published}
            onChange={(v) => patch('published', v)}
            label="Pubblicato"
            hint="Se disattivato, l'evento non sarà visibile sul sito pubblico."
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-3 border-t border-line pt-6">
          <Link to="/admin/eventi">
            <Button variant="ghost" type="button">
              Annulla
            </Button>
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Salvataggio...' : isEdit ? 'Salva modifiche' : 'Crea evento'}
          </Button>
        </div>
      </form>
    </div>
  );
}
