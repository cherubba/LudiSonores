/**
 * Migrazione una-tantum: legge events.json e bandi.json, carica su Firestore.
 *
 * Uso:
 *   1. Scarica service account: Firebase Console -> Project Settings -> Service accounts
 *      -> "Generate new private key" -> salva in v2/scripts/service-account.json
 *      (questo file è in .gitignore, NON committarlo)
 *   2. npm run migrate
 *
 * Idempotente: usa lo slug come document ID, quindi rieseguibile senza duplicati.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccountPath = resolve(__dirname, 'service-account.json');
let serviceAccount: Record<string, unknown>;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));
} catch {
  console.error(`\nErrore: service-account.json non trovato in ${serviceAccountPath}`);
  console.error('Scaricalo dalla Firebase Console: Project Settings -> Service accounts -> Generate new private key\n');
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount as never),
});

const db = getFirestore();

interface EventJson {
  id: string;
  name: string;
  date: string;
  description: string;
  repertoire: string[];
  imageID: string;
  slug: string;
}

interface BandoJson {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  year: number;
  description: string;
  pdf: string;
  active: boolean;
}

const MONTHS_IT: Record<string, number> = {
  gennaio: 0, febbraio: 1, marzo: 2, aprile: 3, maggio: 4, giugno: 5,
  luglio: 6, agosto: 7, settembre: 8, ottobre: 9, novembre: 10, dicembre: 11,
};

const SEASONS_IT: Record<string, number> = {
  primavera: 3, // marzo
  estate: 6,    // luglio
  autunno: 9,   // ottobre
  inverno: 0,   // gennaio (anno corrente)
};

function parseEventDate(dateStr: string): Date | null {
  const s = dateStr.trim();

  // Caso A: DD month YYYY
  let m = s.match(/^(\d{1,2})\s+([a-zA-Zàìè]+)\s+(\d{4})/);
  if (m) {
    const day = parseInt(m[1], 10);
    const month = MONTHS_IT[m[2].toLowerCase()];
    const year = parseInt(m[3], 10);
    if (month === undefined) return null;
    const time = /ore\s+(\d{1,2})[:.](\d{2})/i.exec(s);
    if (time) return new Date(year, month, day, parseInt(time[1], 10), parseInt(time[2], 10));
    return new Date(year, month, day, 18, 0);
  }

  // Caso B: stagione YYYY (es. "Autunno 2021")
  m = s.match(/^(primavera|estate|autunno|inverno)\s+(\d{4})/i);
  if (m) {
    const month = SEASONS_IT[m[1].toLowerCase()];
    return new Date(parseInt(m[2], 10), month, 15, 18, 0);
  }

  // Caso C: month YYYY (es. "Ottobre 2021")
  m = s.match(/^([a-zA-Zàìè]+)\s+(\d{4})/);
  if (m) {
    const month = MONTHS_IT[m[1].toLowerCase()];
    if (month !== undefined) {
      return new Date(parseInt(m[2], 10), month, 15, 18, 0);
    }
  }

  return null;
}

function cloudinaryUrl(imageID: string): string {
  return `https://res.cloudinary.com/dv5vsvca5/image/upload/f_auto,q_auto/${imageID}`;
}

const LOCAL_TO_PUBLIC: Record<string, string> = {
  quattro_stagioni_2: '/img/quattro_stagioni_2.jpg',
  natale_opera_2024_iv: '/img/natale_opera_2024.jpg',
  quattro_stagioni_domma_2025: '/img/quattro_stagioni.jpg',
};

function resolveImageUrl(imageID: string): string {
  return LOCAL_TO_PUBLIC[imageID] ?? cloudinaryUrl(imageID);
}

async function migrateEvents() {
  const json = JSON.parse(
    readFileSync(resolve(__dirname, 'events-backup.json'), 'utf-8'),
  ) as EventJson[];

  console.log(`\n--- Eventi: ${json.length} record ---`);
  const batch = db.batch();
  const collection = db.collection('events');
  const now = FieldValue.serverTimestamp();

  for (const e of json) {
    const date = parseEventDate(e.date);
    if (!date) {
      console.warn(`  SKIP: data non parseable per "${e.name}" (${e.date})`);
      continue;
    }

    const titleParts = e.name.split('-');
    const title = titleParts[0].trim();
    const venue = titleParts.slice(1).join('-').trim() || 'Roma';

    const docData = {
      title,
      venue,
      date: Timestamp.fromDate(date),
      description: e.description,
      programme: e.repertoire,
      imageUrl: resolveImageUrl(e.imageID),
      slug: e.slug,
      published: true,
      createdAt: now,
      updatedAt: now,
    };

    const ref = collection.doc(e.slug);
    batch.set(ref, docData, { merge: true });
    console.log(`  ✓ ${e.slug.padEnd(35)}  ${date.toISOString().split('T')[0]}  ${title}`);
  }

  await batch.commit();
  console.log(`Eventi migrati con successo.`);
}

async function migrateBandi() {
  const json = JSON.parse(
    readFileSync(resolve(__dirname, 'bandi-backup.json'), 'utf-8'),
  ) as BandoJson[];

  console.log(`\n--- Bandi: ${json.length} record ---`);
  const batch = db.batch();
  const collection = db.collection('bandi');
  const now = FieldValue.serverTimestamp();

  for (const b of json) {
    const docData = {
      title: b.title,
      year: b.year,
      description: b.description,
      pdfUrl: b.pdf,
      active: b.active,
      slug: b.slug,
      createdAt: now,
      updatedAt: now,
    };

    const ref = collection.doc(b.slug);
    batch.set(ref, docData, { merge: true });
    console.log(`  ✓ ${b.slug.padEnd(20)}  ${b.year}  ${b.active ? 'attivo' : 'archivio'}  ${b.title}`);
  }

  await batch.commit();
  console.log(`Bandi migrati con successo.`);
}

async function main() {
  console.log('=== Migrazione dati Ludi Sonores -> Firestore ===');
  await migrateEvents();
  await migrateBandi();
  console.log('\n✅ Migrazione completata.\n');
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Errore migrazione:', err);
  process.exit(1);
});
