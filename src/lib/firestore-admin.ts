import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import type { BandoDoc, EventDoc } from '@/types/firestore';

// ============ EVENTS ============

export interface EventInput {
  title: string;
  venue: string;
  date: Date;
  description: string;
  programme: string[];
  imageUrl: string;
  slug: string;
  published: boolean;
}

export async function listAllEvents(): Promise<Array<EventDoc & { id: string }>> {
  const q = query(collection(db, 'events'), orderBy('date', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as EventDoc) }));
}

export async function getEventById(id: string): Promise<(EventDoc & { id: string }) | null> {
  const ref = doc(db, 'events', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as EventDoc) };
}

export async function createEvent(input: EventInput): Promise<void> {
  const ref = doc(db, 'events', input.slug);
  await setDoc(ref, {
    title: input.title,
    venue: input.venue,
    date: Timestamp.fromDate(input.date),
    description: input.description,
    programme: input.programme,
    imageUrl: input.imageUrl,
    slug: input.slug,
    published: input.published,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateEvent(id: string, input: Partial<EventInput>): Promise<void> {
  const ref = doc(db, 'events', id);
  const patch: Record<string, unknown> = { ...input, updatedAt: serverTimestamp() };
  if (input.date) patch.date = Timestamp.fromDate(input.date);
  await updateDoc(ref, patch);
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'events', id));
}

// ============ BANDI ============

export interface BandoInput {
  title: string;
  year: number;
  description: string;
  pdfUrl: string;
  active: boolean;
  slug: string;
}

export async function listAllBandi(): Promise<Array<BandoDoc & { id: string }>> {
  const q = query(collection(db, 'bandi'), orderBy('year', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as BandoDoc) }));
}

export async function getBandoById(id: string): Promise<(BandoDoc & { id: string }) | null> {
  const ref = doc(db, 'bandi', id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as BandoDoc) };
}

export async function createBando(input: BandoInput): Promise<void> {
  const ref = doc(db, 'bandi', input.slug);
  await setDoc(ref, {
    title: input.title,
    year: input.year,
    description: input.description,
    pdfUrl: input.pdfUrl,
    active: input.active,
    slug: input.slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateBando(id: string, input: Partial<BandoInput>): Promise<void> {
  await updateDoc(doc(db, 'bandi', id), { ...input, updatedAt: serverTimestamp() });
}

export async function deleteBando(id: string): Promise<void> {
  await deleteDoc(doc(db, 'bandi', id));
}
