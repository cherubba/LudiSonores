/**
 * Schema dei documenti Firestore.
 * I campi *_en sono opzionali — se assenti, il sito mostra il testo italiano.
 */

import type { Timestamp } from 'firebase/firestore';

export interface EventDoc {
  /** Titolo evento (italiano) */
  title: string;
  /** Titolo evento (inglese) — opzionale */
  title_en?: string;
  /** Sede / location */
  venue: string;
  /** Data e ora dell'evento (Timestamp Firestore) */
  date: Timestamp;
  /** Descrizione lunga (italiano) */
  description: string;
  /** Descrizione lunga (inglese) — opzionale */
  description_en?: string;
  /** Programma musicale: lista voci */
  programme: string[];
  /** URL immagine copertina (Firebase Storage o esterna) */
  imageUrl: string;
  /** Slug per URL — generato dall'admin */
  slug: string;
  /** Pubblicato/bozza */
  published: boolean;
  /** Metadati */
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BandoDoc {
  /** Titolo bando (italiano) */
  title: string;
  /** Titolo bando (inglese) — opzionale */
  title_en?: string;
  /** Anno edizione */
  year: number;
  /** Descrizione (italiano) */
  description: string;
  /** Descrizione (inglese) — opzionale */
  description_en?: string;
  /** URL del PDF (Firebase Storage) */
  pdfUrl: string;
  /** Iscrizioni aperte (true) o archiviato (false) */
  active: boolean;
  /** Slug per URL */
  slug: string;
  /** Metadati */
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
