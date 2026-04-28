import { useRef, useState, type ChangeEvent } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadFile, deleteByUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface Props {
  /** Cartella in cui caricare (es. "events/quattro-stagioni") */
  folder: string;
  /** URL già caricato (per modifica) */
  currentUrl?: string;
  /** Tipi MIME accettati (es. "image/*" o "application/pdf") */
  accept: string;
  /** Etichetta del campo */
  label: string;
  /** Callback quando upload completato */
  onUploaded: (url: string) => void;
  /** Callback quando rimosso (per cancellare anche il file su Storage) */
  onRemoved?: () => void;
  /** Mostra preview immagine? */
  preview?: 'image' | 'pdf' | 'none';
}

export function FileUploader({
  folder,
  currentUrl,
  accept,
  label,
  onUploaded,
  onRemoved,
  preview = 'image',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      const ext = file.name.split('.').pop() || 'bin';
      const path = `${folder}/${Date.now()}.${ext}`;
      const result = await uploadFile(file, path, setProgress);
      if (currentUrl) {
        await deleteByUrl(currentUrl).catch(() => undefined);
      }
      onUploaded(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore nell'upload");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (currentUrl) {
      await deleteByUrl(currentUrl).catch(() => undefined);
    }
    onRemoved?.();
  }

  return (
    <div>
      <span className="mb-2 block text-xs tracking-[0.2em] text-fg-muted uppercase">{label}</span>

      {currentUrl && preview === 'image' && (
        <div className="mb-3 inline-block border border-line bg-bg-soft p-2">
          <img src={currentUrl} alt="" className="max-h-40 w-auto" />
        </div>
      )}
      {currentUrl && preview === 'pdf' && (
        <div className="mb-3 inline-block border border-line bg-bg-soft px-4 py-3 text-sm text-fg-muted">
          📄 PDF caricato
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 border border-gold-soft bg-bg-soft px-4 py-3 text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:border-gold hover:text-gold',
            uploading && 'cursor-wait opacity-60',
          )}
        >
          <Upload size={14} />
          {uploading ? `Upload... ${progress.toFixed(0)}%` : currentUrl ? 'Sostituisci' : 'Carica file'}
        </button>
        {currentUrl && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="cursor-pointer p-2 text-fg-muted transition-colors hover:text-red-400"
            aria-label="Rimuovi file"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
