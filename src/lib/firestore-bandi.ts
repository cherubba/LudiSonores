import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import type { Bando } from '@/types';
import type { BandoDoc } from '@/types/firestore';

function toBando(id: string, d: BandoDoc): Bando {
  return {
    id,
    slug: d.slug,
    title: d.title,
    shortTitle: d.title,
    year: d.year,
    description: d.description ?? '',
    pdf: d.pdfUrl,
    active: d.active,
  };
}

export async function fetchAllBandi(): Promise<Bando[]> {
  const q = query(collection(db, 'bandi'), orderBy('year', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => toBando(d.id, d.data() as BandoDoc));
}

export async function fetchBandoBySlug(slug: string): Promise<Bando | null> {
  const ref = doc(db, 'bandi', slug);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return toBando(snap.id, snap.data() as BandoDoc);
}
