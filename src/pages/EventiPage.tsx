import { useTranslation } from 'react-i18next';
import { Container } from '@/components/layout/Container';
import { EventsGrid } from '@/components/sections/EventsGrid';
import { PageError, PageLoading } from '@/components/ui/PageState';
import { useReveal } from '@/hooks/useReveal';
import { useData } from '@/lib/data';
import { sortEvents } from '@/lib/events';

export default function EventiPage() {
  const { t } = useTranslation();
  const { events, loading, error } = useData();
  const headRef = useReveal<HTMLDivElement>();
  const emptyRef = useReveal<HTMLDivElement>();

  if (loading && events.length === 0) return <PageLoading />;
  if (error) return <PageError message={error.message} />;

  const { upcoming, past } = sortEvents(events);

  return (
    <>
      <section className="pt-40 pb-20 md:pt-48 md:pb-28">
        <Container>
          <div ref={headRef} className="reveal max-w-3xl">
            <span className="mono-up text-gold">{t('events.page_eyebrow')}</span>
            <h1 className="mt-6 text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]">
              {t('events.page_title_part1')}{' '}
              <em className="italic text-gold">{t('events.page_title_emphasis')}</em>
            </h1>
            <p className="mt-8 text-lg leading-[1.7] text-fg-muted">
              {t('events.page_subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {upcoming.length > 0 ? (
        <EventsGrid
          events={upcoming}
          title={t('events.section_upcoming_title')}
          eyebrow={t('events.section_upcoming_eyebrow')}
        />
      ) : (
        <section className="border-y border-line bg-bg-soft py-20 md:py-28">
          <Container>
            <div ref={emptyRef} className="reveal mx-auto max-w-2xl text-center">
              <span className="mono-up text-gold">{t('events.empty_eyebrow')}</span>
              <h2 className="mt-6 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
                {t('events.empty_title_part1')}{' '}
                <em className="italic text-gold">{t('events.empty_title_emphasis')}</em>
              </h2>
              <p className="mt-6 text-fg-muted">{t('events.empty_text')}</p>
            </div>
          </Container>
        </section>
      )}

      {past.length > 0 && (
        <EventsGrid
          events={past}
          title={t('events.section_archive_title')}
          eyebrow={t('events.section_archive_eyebrow')}
        />
      )}
    </>
  );
}
