import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
  type UploadTaskSnapshot,
} from 'firebase/storage';
import { storage } from './firebase';

export interface UploadResult {
  url: string;
  path: string;
}

export async function uploadFile(
  file: File,
  path: string,
  onProgress?: (percent: number) => void,
): Promise<UploadResult> {
  const ref = storageRef(storage, path);
  const task = uploadBytesResumable(ref, file, { contentType: file.type });

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snap: UploadTaskSnapshot) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        onProgress?.(pct);
      },
      (err) => reject(err),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ url, path });
        } catch (err) {
          reject(err);
        }
      },
    );
  });
}

/** Cancella un file dato il suo download URL (estrae il path da gs://... encoded). */
export async function deleteByUrl(url: string): Promise<void> {
  if (!url || !url.includes('firebasestorage')) return;
  try {
    const decoded = decodeURIComponent(url);
    const m = /\/o\/([^?]+)/.exec(decoded);
    if (!m) return;
    await deleteObject(storageRef(storage, m[1]));
  } catch {
    // ignore: file potrebbe non esistere
  }
}

/** Genera uno slug URL-safe da una stringa qualsiasi */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}
