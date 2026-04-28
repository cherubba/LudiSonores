import type { EventItem } from '@/types';

const MONTHS_IT: Record<string, number> = {
  gennaio: 0, febbraio: 1, marzo: 2, aprile: 3, maggio: 4, giugno: 5,
  luglio: 6, agosto: 7, settembre: 8, ottobre: 9, novembre: 10, dicembre: 11,
};

const MONTHS_IT_DISPLAY = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];

const MONTHS_EN_DISPLAY = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatMonthByLocale(monthIt: string, locale: string): string {
  if (locale.startsWith('en')) {
    const idx = MONTHS_IT_DISPLAY.indexOf(monthIt);
    if (idx >= 0) return MONTHS_EN_DISPLAY[idx];
  }
  return monthIt;
}

export function parseEventDate(dateStr: string): Date | null {
  const match = dateStr.trim().match(/^(\d{1,2})\s+([a-zA-Zàìè]+)\s+(\d{4})/);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const month = MONTHS_IT[match[2].toLowerCase()];
  const year = parseInt(match[3], 10);
  if (month === undefined) return null;
  return new Date(year, month, day);
}

export interface SplitDate {
  day: string;
  month: string;
  year: string;
}

export function splitDate(dateStr: string): SplitDate {
  const d = parseEventDate(dateStr);
  if (!d) return { day: '--', month: '--', year: '----' };
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: MONTHS_IT_DISPLAY[d.getMonth()],
    year: String(d.getFullYear()),
  };
}

export function sortEvents(events: EventItem[]): { upcoming: EventItem[]; past: EventItem[] } {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const withDate = events.map((e) => ({ event: e, date: parseEventDate(e.date) }));

  const upcoming = withDate
    .filter((x) => x.date && x.date >= now)
    .sort((a, b) => a.date!.getTime() - b.date!.getTime())
    .map((x) => x.event);

  const past = withDate
    .filter((x) => !x.date || x.date < now)
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .map((x) => x.event);

  return { upcoming, past };
}

const LOCAL_IMAGE_MAP: Record<string, string> = {
  quattro_stagioni_2: '/img/quattro_stagioni_2.jpg',
  natale_opera_2024_iv: '/img/natale_opera_2024.jpg',
  natale_opera_2024_rdrzxn: '/img/natale_opera_2024.jpg',
  quattro_stagioni_domma_2025: '/img/quattro_stagioni.jpg',
};

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dv5vsvca5/image/upload';

interface ImgOpts { w?: number; h?: number }

/**
 * Risolve l'URL dell'immagine evento.
 * - Se l'evento ha già imageUrl (da Firestore/Storage o esterno), lo ritorna direttamente
 * - Altrimenti tenta lookup locale per imageID, fallback Cloudinary
 */
export function eventImageUrl(event: EventItem, opts: ImgOpts = {}): string {
  if (event.imageUrl) return event.imageUrl;
  if (event.imageID) {
    const local = LOCAL_IMAGE_MAP[event.imageID];
    if (local) return local;
    const transforms: string[] = ['f_auto', 'q_auto'];
    if (opts.w) transforms.push(`w_${opts.w}`);
    if (opts.h) transforms.push(`h_${opts.h}`, 'c_fill', 'g_auto');
    return `${CLOUDINARY_BASE}/${transforms.join(',')}/${event.imageID}`;
  }
  return '';
}
