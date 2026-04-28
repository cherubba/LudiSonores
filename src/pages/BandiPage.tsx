import { useTranslation } from 'react-i18next';
import { Container } from '@/components/layout/Container';
import { BandiList } from '@/components/sections/BandiList';
import { PageError, PageLoading } from '@/components/ui/PageState';
import { useReveal } from '@/hooks/useReveal';
import { useData } from '@/lib/data';

export default function BandiPage() {
  const { t } = useTranslation();
  const { bandi, loading, error } = useData();
  const headRef = useReveal<HTMLDivElement>();

  if (loading && bandi.length === 0) return <PageLoading />;
  if (error) return <PageError message={error.message} />;

  const active = bandi.filter((b) => b.active);
  const archived = bandi.filter((b) => !b.active);

  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-20">
        <Container>
          <div ref={headRef} className="reveal max-w-3xl">
            <span className="mono-up text-gold">{t('bandi.page_eyebrow')}</span>
            <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]">
              {t('bandi.page_title_part1')}{' '}
              <em className="italic text-gold">{t('bandi.page_title_emphasis')}</em>
            </h1>
            <p className="mt-8 text-lg leading-[1.7] text-fg-muted">
              {t('bandi.page_subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {active.length > 0 && (
        <BandiList
          bandi={active}
          title={t('bandi.section_active_title')}
          eyebrow={t('bandi.section_active_eyebrow')}
        />
      )}

      {archived.length > 0 && (
        <div className="border-t border-line bg-bg-soft">
          <BandiList
            bandi={archived}
            title={t('bandi.section_archive_title')}
            eyebrow={t('bandi.section_archive_eyebrow')}
          />
        </div>
      )}
    </>
  );
}
