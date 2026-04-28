import { useTranslation } from 'react-i18next';
import { Hero } from '@/components/sections/Hero';
import { NextEvent } from '@/components/sections/NextEvent';
import { EventsGrid } from '@/components/sections/EventsGrid';
import { About } from '@/components/sections/About';
import { BandiList } from '@/components/sections/BandiList';
import { useData } from '@/lib/data';
import { sortEvents } from '@/lib/events';

export default function HomePage() {
  const { t } = useTranslation();
  const { events, bandi, loading } = useData();

  if (loading && events.length === 0 && bandi.length === 0) {
    return <Hero />;
  }

  const { upcoming, past } = sortEvents(events);
  const activeBandi = bandi.filter((b) => b.active);
  const hasUpcoming = upcoming.length > 0;
  const featured = hasUpcoming ? upcoming[0] : past[0];
  const others = hasUpcoming ? upcoming.slice(1, 4) : past.slice(1, 4);

  return (
    <>
      <Hero />
      {featured && <NextEvent event={featured} isPast={!hasUpcoming} />}
      {others.length > 0 && (
        <EventsGrid
          events={others}
          title={
            hasUpcoming
              ? t('events.section_home_upcoming_title')
              : t('events.section_home_archive_title')
          }
          eyebrow={
            hasUpcoming
              ? t('events.page_eyebrow')
              : t('events.section_home_archive_eyebrow')
          }
        />
      )}
      <About />
      {activeBandi.length > 0 && (
        <BandiList
          bandi={activeBandi}
          title={t('bandi.home_section_title')}
          eyebrow={t('bandi.home_section_eyebrow')}
        />
      )}
    </>
  );
}
