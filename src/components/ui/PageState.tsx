import { Container } from '@/components/layout/Container';

export function PageLoading() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center pt-40 pb-20">
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-line border-t-gold" />
        <span className="mono-up text-fg-muted">Caricamento</span>
      </div>
    </Container>
  );
}

export function PageError({ message }: { message?: string }) {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center pt-40 pb-20">
      <div className="text-center">
        <span className="mono-up text-gold">Errore</span>
        <h2 className="mt-4 font-display text-3xl">Qualcosa è andato storto</h2>
        {message && <p className="mt-4 text-fg-muted">{message}</p>}
      </div>
    </Container>
  );
}
