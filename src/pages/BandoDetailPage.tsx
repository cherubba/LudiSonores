import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { PageError, PageLoading } from '@/components/ui/PageState';
import { useReveal } from '@/hooks/useReveal';
import { useData } from '@/lib/data';

export default function BandoDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { bandi, loading, error } = useData();

  const headRef = useReveal<HTMLDivElement>();
  const descRef = useReveal<HTMLParagraphElement>();
  const pdfRef = useReveal<HTMLDivElement>();

  if (loading && bandi.length === 0) return <PageLoading />;
  if (error) return <PageError message={error.message} />;

  const bando = bandi.find((b) => b.slug === slug);

  if (!bando) {
    return (
      <Container className="py-40 text-center">
        <h1 className="mb-6 text-4xl">{t('common.bando_not_found')}</h1>
        <Link to="/bandi" className="text-gold underline">
          {t('common.back_bandi')}
        </Link>
      </Container>
    );
  }

  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <Container>
          <Link
            to="/bandi"
            className="mb-8 inline-flex items-center gap-2 text-sm tracking-[0.15em] text-fg-muted uppercase transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} /> {t('bandi.back_to_all')}
          </Link>
          <div ref={headRef} className="reveal max-w-4xl">
            <span className="mono-up text-gold">
              {bando.active ? t('bandi.label_open') : t('bandi.label_closed')} · {bando.year}
            </span>
            <h1 className="mt-6 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05]">
              {bando.title}
            </h1>
            {bando.description && (
              <p ref={descRef} className="reveal mt-10 text-lg leading-[1.8] text-fg-muted">
                {bando.description}
              </p>
            )}
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={bando.pdf} download>
                <Button>
                  <Download size={16} /> {t('bandi.download')}
                </Button>
              </a>
              {bando.active && (
                <Link to="/contatti">
                  <Button variant="ghost">{t('bandi.request_info')}</Button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div ref={pdfRef} className="reveal aspect-[3/4] w-full overflow-hidden border border-line bg-bg-soft md:aspect-[16/10]">
            <iframe
              src={bando.pdf}
              title={bando.title}
              className="h-full w-full"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
