import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { EventItem } from '@/types';
import type { EventDoc } from '@/types/firestore';

const MONTHS_IT = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
];

/**
 * Converte un EventDoc Firestore nel formato EventItem usato dai componenti.
 * Mantiene la stringa "data IT + ore HH:MM" per retro-compatibilità con
 * splitDate / parseEventDate / regex orario in NextEvent.
 */
function toEventItem(id: string, d: EventDoc): EventItem {
  const dt: Date = (d.date as Timestamp).toDate();
  const dateStr = `${dt.getDate()} ${MONTHS_IT[dt.getMonth()]} ${dt.getFullYear()} - ore ${String(
    dt.getHours(),
  ).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;

  const venueClean = d.venue?.trim();
  const name = venueClean && venueClean !== 'Roma' ? `${d.title} - ${venueClean}` : d.title;

  return {
    id,
    name,
    date: dateStr,
    description: d.description ?? '',
    repertoire: d.programme ?? [],
    imageID: '',
    slug: d.slug,
    imageUrl: d.imageUrl,
  } as EventItem & { imageUrl: string };
}

export async function fetchPublishedEvents(): Promise<EventItem[]> {
  const q = query(collection(db, 'events'), orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ doc: d.data() as EventDoc, id: d.id }))
    .filter((x) => x.doc.published)
    .map((x) => toEventItem(x.id, x.doc));
}

export async function fetchEventBySlug(slug: string): Promise<EventItem | null> {
  const ref = doc(db, 'events', slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as EventDoc;
  if (!data.published) return null;
  return toEventItem(snap.id, data);
}
