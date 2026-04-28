export interface EventItem {
  id: string;
  name: string;
  date: string;
  description: string;
  repertoire: string[];
  imageID: string;
  slug: string;
  /** Quando viene da Firestore, URL diretto dell'immagine (Storage o esterna) */
  imageUrl?: string;
}

export interface Bando {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  year: number;
  description: string;
  pdf: string;
  active: boolean;
}

export type Locale = 'it' | 'en';
