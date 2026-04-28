/**
 * Scarica tutte le immagini referenziate dai documenti `events` di Firestore,
 * le ottimizza, le carica su Firebase Storage in `events/{slug}/cover.jpg`,
 * e aggiorna `imageUrl` nel documento.
 *
 * Skippa gli eventi che hanno già un'immagine in firebasestorage.
 *
 * Uso:
 *   1. service-account.json già presente in scripts/
 *   2. npm run migrate:images
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const serviceAccountPath = resolve(__dirname, 'service-account.json');
let serviceAccount: Record<string, unknown>;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));
} catch {
  console.error(`\nErrore: service-account.json non trovato in ${serviceAccountPath}\n`);
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount as never),
  storageBucket: 'ludi-sonores.firebasestorage.app',
});

const db = getFirestore();
const bucket = getStorage().bucket();

interface EventDoc {
  slug: string;
  title: string;
  imageUrl?: string;
  date?: Timestamp;
}

interface EventBackupJson {
  slug: string;
  imageID: string;
}

// Carica anche backup per recuperare gli imageID Cloudinary originali
const backup = JSON.parse(
  readFileSync(resolve(__dirname, 'events-backup.json'), 'utf-8'),
) as EventBackupJson[];
const slugToImageID = new Map(backup.map((e) => [e.slug, e.imageID]));

const LOCAL_TO_PATH: Record<string, string> = {
  quattro_stagioni_2: 'public/img/quattro_stagioni_2.jpg',
  natale_opera_2024_iv: 'public/img/natale_opera_2024.jpg',
  natale_opera_2024_rdrzxn: 'public/img/natale_opera_2024.jpg',
  quattro_stagioni_domma_2025: 'public/img/quattro_stagioni.jpg',
};

const CLOUDINARY_BASE = 'https://res.cloudinary.com/dv5vsvca5/image/upload';

async function fetchSourceBytes(imageID: string): Promise<Buffer> {
  const localPath = LOCAL_TO_PATH[imageID];
  if (localPath) {
    return readFileSync(resolve(ROOT, localPath));
  }
  // Cloudinary - chiedo originale (no transforms) per qualità massima
  const url = `${CLOUDINARY_BASE}/${imageID}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} per ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processEvent(slug: string, doc: EventDoc): Promise<void> {
  const imageID = slugToImageID.get(slug);
  const currentUrl = doc.imageUrl || '';

  // Skip: ha già un'immagine su firebasestorage
  if (currentUrl.includes('firebasestorage')) {
    console.log(`  ⊙ ${slug.padEnd(35)}  già su Storage, skip`);
    return;
  }

  if (!imageID) {
    console.log(`  ⚠ ${slug.padEnd(35)}  nessun imageID nel backup, skip`);
    return;
  }

  console.log(`  → ${slug.padEnd(35)}  scarico...`);

  let sourceBytes: Buffer;
  try {
    sourceBytes = await fetchSourceBytes(imageID);
  } catch (err) {
    console.log(`    ✗ download fallito: ${(err as Error).message}`);
    return;
  }

  // Ottimizza: max lato lungo 1600px, JPG q82, strip metadata, auto-orient
  const optimized = await sharp(sourceBytes)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

  const sizeMb = (optimized.length / 1024 / 1024).toFixed(2);

  // Upload su Firebase Storage
  const destPath = `events/${slug}/cover.jpg`;
  const file = bucket.file(destPath);

  // Token download stabile per URL pubblico
  const downloadToken = crypto.randomUUID();

  await file.save(optimized, {
    contentType: 'image/jpeg',
    metadata: {
      cacheControl: 'public, max-age=31536000, immutable',
      metadata: {
        firebaseStorageDownloadTokens: downloadToken,
      },
    },
  });

  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
    destPath,
  )}?alt=media&token=${downloadToken}`;

  // Aggiorna Firestore
  await db.collection('events').doc(slug).update({
    imageUrl: publicUrl,
    updatedAt: FieldValue.serverTimestamp(),
  });

  console.log(`    ✓ caricata (${sizeMb} MB) e Firestore aggiornato`);
}

async function main() {
  console.log('=== Migrazione immagini eventi -> Firebase Storage ===\n');

  const snap = await db.collection('events').get();
  console.log(`Trovati ${snap.size} eventi in Firestore\n`);

  let processed = 0;
  let skipped = 0;

  for (const docSnap of snap.docs) {
    const doc = docSnap.data() as EventDoc;
    const before = doc.imageUrl;
    await processEvent(docSnap.id, doc);
    const after = (await docSnap.ref.get()).data()?.imageUrl;
    if (before !== after) processed++;
    else skipped++;
  }

  console.log(`\n✅ Completato: ${processed} migrate, ${skipped} skip.\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌ Errore:', err);
  process.exit(1);
});
