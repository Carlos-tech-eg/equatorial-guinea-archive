/**
 * Traslada la biografía de Pedro Ela Nguema de política → personajes históricos.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OLD_ID = 'aFC7dgObggUtHPsP57y1';
const NEW_ID = 'pedro-ela-nguema';

function loadEnvLocal() {
  const envPath = join(ROOT, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const val = m[2].trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});
const db = getFirestore(app);

const snap = await getDoc(doc(db, 'biographies', OLD_ID));
if (!snap.exists()) {
  console.error('No se encontró la biografía original en Firestore.');
  process.exit(1);
}

const data = snap.data();
const description = typeof data.description === 'string' ? data.description : '';

await setDoc(doc(db, 'biographies', NEW_ID), {
  category: 'personasHistoricas',
  name: 'Pedro Ela Nguema Andeme',
  imageUrl: data.imageUrl || '',
  year: '1936–1971',
  description,
  works: Array.isArray(data.works) ? data.works : [],
  updatedAt: serverTimestamp(),
  createdAt: data.createdAt ?? serverTimestamp(),
});

await deleteDoc(doc(db, 'biographies', OLD_ID));

console.log(`✓ Biografía movida: biographies/${OLD_ID} → biographies/${NEW_ID}`);
console.log('  Categoría: politica → personasHistoricas');
