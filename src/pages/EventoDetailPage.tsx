import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { PageError, PageLoading } from '@/components/ui/PageState';
import { useReveal } from '@/hooks/useReveal';
import { useData } from '@/lib/data';
import {
  eventImageUrl,
  formatMonthByLocale,
  parseEventDate,
  splitDate,
} from '@/lib/events';

export default function EventoDetailPage() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const { events, loading, error } = useData();

  const dateRef = useReveal<HTMLDivElement>();
  const titleRef = useReveal<HTMLHeadingElement>();
  const descRef = useReveal<HTMLParagraphElement>();
  const progRef = useReveal<HTMLUListElement>();

  if (loading && events.length === 0) return <PageLoading />;
  if (error) return <PageError message={error.message} />;

  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <Container className="py-40 text-center">
        <h1 className="mb-6 text-4xl">{t('common.event_not_found')}</h1>
        <Link to="/eventi" className="text-gold underline">
          {t('common.back_events')}
        </Link>
      </Container>
    );
  }

  const { day, month, year } = splitDate(event.date);
  const monthLocal = formatMonthByLocale(month, i18n.resolvedLanguage || 'it');
  const time = /ore\s+(\d{1,2}[:.]\d{2})/i.exec(event.description) ??
    /ore\s+(\d{1,2}[:.]\d{2})/i.exec(event.date);
  const timeStr = time?.[1];
  const venue = event.name.split('-').slice(1).join('-').trim() || 'Roma';
  const titleClean = event.name.split('-')[0].trim();
  const eventDate = parseEventDate(event.date);
  const isPast = eventDate ? eventDate < new Date() : true;

  return (
    <>
      <section className="relative flex min-h-[80vh] items-end overflow-hidden pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${eventImageUrl(event, { w: 1920 })}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg/70" />

        <Container className="relative z-10 pb-16 md:pb-24">
          <Link
            to="/eventi"
            className="mb-8 inline-flex items-center gap-2 text-sm tracking-[0.15em] text-fg-muted uppercase transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} /> {t('events.back_to_all')}
          </Link>
          <div ref={dateRef} className="reveal mb-6 flex items-end gap-6">
            <span className="font-display text-7xl leading-none text-gold md:text-8xl">{day}</span>
            <div className="pb-2">
              <div className="font-display text-2xl italic">{monthLocal} {year}</div>
              {timeStr && <div className="text-sm text-fg-muted">ore {timeStr}</div>}
            </div>
          </div>
          <h1 ref={titleRef} className="reveal max-w-[20ch] text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05]">
            {titleClean}
          </h1>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
            <aside className="space-y-8">
              <Detail label={t('events.detail_label_venue')} value={venue} />
              <Detail label={t('events.detail_label_date')} value={`${day} ${monthLocal} ${year}`} />
              {timeStr && <Detail label={t('events.detail_label_time')} value={`ore ${timeStr}`} />}
            </aside>

            <div>
              <p ref={descRef} className="reveal mb-12 text-lg leading-[1.8] text-fg-muted">
                {event.description}
              </p>

              <h3 className="mb-6 text-xs tracking-[0.25em] text-gold uppercase">
                {t('events.detail_programme')}
              </h3>
              <ul ref={progRef} className="reveal divide-y divide-line border-y border-line">
                {event.repertoire.map((line) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-4 py-4 font-display text-lg"
                  >
                    <span className="text-2xl text-gold">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              {!isPast && (
                <div className="mt-12">
                  <Link to="/contatti">
                    <Button>
                      {t('events.detail_request_info')} <span>→</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs tracking-[0.25em] text-fg-muted uppercase">{label}</div>
      <div className="mt-2 font-display text-xl">{value}</div>
    </div>
  );
}
