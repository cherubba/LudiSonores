import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReveal } from '@/hooks/useReveal';
import { Button } from '@/components/ui/Button';
import { eventImageUrl, formatMonthByLocale, splitDate } from '@/lib/events';
import type { EventItem } from '@/types';

interface Props {
  event: EventItem;
  isPast?: boolean;
}

export function NextEvent({ event, isPast = false }: Props) {
  const { t, i18n } = useTranslation();
  const imgRef = useReveal<HTMLDivElement>();
  const dateRef = useReveal<HTMLDivElement>();
  const titleRef = useReveal<HTMLHeadingElement>();
  const progRef = useReveal<HTMLUListElement>();
  const metaRef = useReveal<HTMLDivElement>();
  const btnRef = useReveal<HTMLDivElement>();

  const { day, month, year } = splitDate(event.date);
  const monthLocal = formatMonthByLocale(month, i18n.resolvedLanguage || 'it');
  const time = /ore\s+(\d{1,2}[:.]\d{2})/i.exec(event.description)?.[1];
  const venue = event.name.split('-').slice(1).join('-').trim() || event.name;

  return (
    <section className="overflow-hidden border-y border-line bg-bg-soft">
      <div className="grid grid-cols-1 lg:min-h-[80vh] lg:grid-cols-[1.1fr_1fr]">
        <div
          ref={imgRef}
          className="reveal relative min-h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url('${eventImageUrl(event, { w: 1400 })}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-bg/60" />
        </div>

        <div className="flex flex-col justify-center px-8 py-16 md:px-20 md:py-24">
          <span className="mono-up text-gold">
            {isPast ? t('next_event.label_past') : t('next_event.label_upcoming')}
          </span>

          <div ref={dateRef} className="reveal mt-8 mb-10 flex items-start gap-8">
            <span className="font-display text-7xl leading-none text-gold">{day}</span>
            <div className="flex flex-col gap-1.5 pt-2">
              <span className="font-display text-2xl italic">{monthLocal}</span>
              <span className="text-xs tracking-[0.25em] text-fg-muted">{year}</span>
              {time && <span className="mt-2 text-sm text-fg-muted">ore {time}</span>}
            </div>
          </div>

          <h2 ref={titleRef} className="reveal mb-5 text-[clamp(2rem,4vw,3rem)]">
            {event.name.split('-')[0].trim()}
          </h2>

          <ul ref={progRef} className="reveal my-8 list-none border-t border-line pt-8">
            {event.repertoire.slice(0, 4).map((line) => (
              <li
                key={line}
                className="flex items-baseline gap-4 py-2 font-display text-lg text-fg-muted"
              >
                <span className="text-2xl text-gold">·</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div ref={metaRef} className="reveal mt-2 mb-10 flex flex-wrap gap-8">
            <Meta label={t('next_event.venue_label')} value={venue} />
          </div>

          <div ref={btnRef} className="reveal self-start">
            <Link to={`/eventi/${event.slug}`}>
              <Button>
                {isPast ? t('next_event.cta_past') : t('next_event.cta_upcoming')} <span>→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-fg-muted">{label}</span>
      <span className="font-display text-lg">{value}</span>
    </div>
  );
}
