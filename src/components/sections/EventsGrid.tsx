import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReveal } from '@/hooks/useReveal';
import { Container } from '@/components/layout/Container';
import { eventImageUrl, formatMonthByLocale, parseEventDate, splitDate } from '@/lib/events';
import { cn } from '@/lib/utils';
import type { EventItem } from '@/types';

interface Props {
  events: EventItem[];
  title: string;
  eyebrow: string;
}

export function EventsGrid({ events, title, eyebrow }: Props) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-16">
          <span className="mono-up text-gold">{eyebrow}</span>
          <h2 className="mt-6 max-w-[18ch] text-[clamp(2rem,5vw,3.75rem)]">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} delay={(i % 3) * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function EventCard({ event, delay }: { event: EventItem; delay: number }) {
  const { t, i18n } = useTranslation();
  const ref = useReveal<HTMLAnchorElement>();
  const date = splitDate(event.date);
  const monthLocal = formatMonthByLocale(date.month, i18n.resolvedLanguage || 'it');
  const eventDate = parseEventDate(event.date);
  const isPast = eventDate ? eventDate < new Date() : true;
  const venue = event.name.split('-').slice(1).join('-').trim();

  return (
    <Link
      ref={ref}
      to={`/eventi/${event.slug}`}
      className="reveal group cursor-pointer"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-black">
        <img
          src={eventImageUrl(event, { w: 1000 })}
          alt={event.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg/50" />
        <span
          className={cn(
            'absolute top-5 left-5 z-10 border bg-bg/80 px-3.5 py-2 text-[0.68rem] tracking-[0.2em] uppercase backdrop-blur-md',
            isPast ? 'border-line text-fg-muted' : 'border-gold-soft text-gold',
          )}
        >
          {isPast ? t('events.card_badge_past') : t('events.card_badge_upcoming')}
        </span>
        <div className="absolute right-4 bottom-4 z-10 flex flex-col items-center border border-gold-soft/60 bg-bg/85 px-3.5 py-2.5 text-center backdrop-blur-md">
          <span className="font-display text-2xl leading-none text-gold">{date.day}</span>
          <span className="mt-0.5 font-display text-xs italic text-fg">{monthLocal}</span>
          <span className="mt-0.5 text-[0.6rem] tracking-[0.2em] text-fg-muted">{date.year}</span>
        </div>
      </div>
      <h3 className="mb-2 text-xl transition-colors group-hover:text-gold md:text-2xl">
        {event.name.split('-')[0].trim()}
      </h3>
      {venue && <p className="text-sm text-fg-muted">{venue}</p>}
    </Link>
  );
}
