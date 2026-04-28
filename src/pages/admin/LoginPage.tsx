import { useState, useEffect, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useDynamicManifest } from '@/hooks/useDynamicManifest';
import { Button } from '@/components/ui/Button';
import { Field, TextInput } from '@/components/admin/FormFields';

export default function LoginPage() {
  useDynamicManifest('/manifest-admin.json');
  const { signIn, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && isAdmin) {
      const dest = (location.state as { from?: string } | null)?.from ?? '/admin';
      navigate(dest, { replace: true });
    }
  }, [user, isAdmin, location.state, navigate]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      const code = (err as { code?: string; message?: string }).code;
      const msg = (err as Error).message;
      if (msg === 'NOT_ADMIN') {
        setError('Account non autorizzato.');
      } else if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Credenziali non valide.');
      } else {
        setError('Errore di accesso. Riprova.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-12 flex items-center justify-center gap-3">
          <img src="/img/logo.png" alt="" className="h-10" />
          <span className="font-display text-base uppercase tracking-[0.15em] text-fg">
            Ludi Sonores
          </span>
        </Link>

        <div className="border border-line bg-bg-soft p-8 md:p-10">
          <span className="mono-up text-gold">Area riservata</span>
          <h1 className="mt-4 mb-8 font-display text-3xl">Accedi</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Email" required>
              <TextInput
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password" required>
              <TextInput
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" disabled={submitting} className="w-full justify-center">
              {submitting ? 'Accesso...' : 'Entra'} <span>→</span>
            </Button>
          </form>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-xs tracking-[0.15em] text-fg-muted uppercase transition-colors hover:text-gold"
        >
          ← Torna al sito
        </Link>
      </div>
    </div>
  );
}
