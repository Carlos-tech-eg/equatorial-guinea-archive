/**
 * Sube imágenes de public/images a Firebase Storage y actualiza imageUrl en Firestore.
 * Requiere credenciales de Google (gcloud auth application-default login) o
 * GOOGLE_APPLICATION_CREDENTIALS apuntando a una service account JSON.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import admin from 'firebase-admin';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_IMAGES = join(ROOT, 'public', 'images');

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

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'admin-panel-archivoseg';
const storageBucket =
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ||
  'admin-panel-archivoseg.firebasestorage.app';

if (!admin.apps.length) {
  admin.initializeApp({ projectId, storageBucket });
}

const bucket = admin.storage().bucket();
const db = admin.firestore();

async function uploadFile(localPath, storagePath) {
  const [file] = await bucket.upload(localPath, {
    destination: storagePath,
    metadata: {
      contentType: localPath.toLowerCase().endsWith('.png')
        ? 'image/png'
        : localPath.toLowerCase().endsWith('.webp')
          ? 'image/webp'
          : 'image/jpeg',
      cacheControl: 'public,max-age=31536000',
    },
  });
  await file.makePublic();
  return `https://storage.googleapis.com/${bucket.name}/${storagePath}`;
}

async function updateCollectionUrls(collectionName, folder) {
  const snap = await db.collection(collectionName).get();
  let updated = 0;

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const current = typeof data.imageUrl === 'string' ? data.imageUrl : '';
    if (current.startsWith('https://storage.googleapis.com/') || current.includes('firebasestorage.googleapis.com')) {
      continue;
    }

    let localFile = '';
    if (current.startsWith('/images/')) {
      localFile = current.replace('/images/', '');
    } else if (current.startsWith('images/')) {
      localFile = current.replace('images/', '');
    } else {
      continue;
    }

    const localPath = join(PUBLIC_IMAGES, localFile);
    if (!existsSync(localPath)) continue;

    const storagePath = `${folder}/${docSnap.id}_${basename(localFile)}`;
    try {
      const url = await uploadFile(localPath, storagePath);
      await docSnap.ref.update({ imageUrl: url, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
      updated += 1;
      console.log(`  ✓ ${collectionName}/${docSnap.id} → Storage`);
    } catch (err) {
      console.warn(`  ⚠ ${docSnap.id}: ${err.message}`);
    }
  }

  return updated;
}

async function main() {
  console.log(`Proyecto: ${projectId}`);
  console.log(`Bucket: ${storageBucket}\n`);

  const photosUpdated = await updateCollectionUrls('photos', 'photos');
  const biosUpdated = await updateCollectionUrls('biographies', 'biographies');

  console.log(`\n✅ Storage actualizado — photos: ${photosUpdated}, biographies: ${biosUpdated}`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  console.error(
    '\nSi falla por credenciales, ejecuta: gcloud auth application-default login',
    '\no define GOOGLE_APPLICATION_CREDENTIALS con una service account del proyecto Firebase.',
  );
  process.exit(1);
});
