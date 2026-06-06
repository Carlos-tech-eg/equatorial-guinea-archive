/**
 * Copia imágenes del archivo a public/images y repuebla Firestore (+ Storage si hay auth).
 *
 * Uso:
 *   node scripts/seed-firebase-archive.mjs
 *   FIREBASE_SEED_EMAIL=... FIREBASE_SEED_PASSWORD=... node scripts/seed-firebase-archive.mjs
 */
import { readFileSync, copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ASSETS = join(
  process.env.USERPROFILE || process.env.HOME || '',
  '.cursor',
  'projects',
  'c-Users-hp-Desktop-Museum-Style-Historical-Archive-Website',
  'assets',
);
const PUBLIC_IMAGES = join(ROOT, 'public', 'images');
const MAP_PATH = join(__dirname, 'archive-image-map.json');

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

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyAn9O9pDA4ehNlY2n87YX5Pdu1yfAFkcq0',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'admin-panel-archivoseg.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'admin-panel-archivoseg',
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ||
    'admin-panel-archivoseg.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '741494838923',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '1:741494838923:web:9b929d228de9428608268e',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const bucketId = firebaseConfig.storageBucket;
const storage = getStorage(app, bucketId.startsWith('gs://') ? bucketId : `gs://${bucketId}`);

function resolveAssetPath(source) {
  if (!existsSync(ASSETS)) return null;
  const base = source.replace(/\.(png|jpe?g)$/i, '');
  const match = readdirSync(ASSETS).find((f) => f.includes(base));
  return match ? join(ASSETS, match) : null;
}

async function maybeSignIn() {
  const email = process.env.FIREBASE_SEED_EMAIL;
  const password = process.env.FIREBASE_SEED_PASSWORD;
  if (!email || !password) {
    console.log('ℹ️  Sin FIREBASE_SEED_EMAIL/PASSWORD — Firestore con rutas /images/ (Storage omitido).');
    return false;
  }
  await signInWithEmailAndPassword(auth, email, password);
  console.log('✓ Autenticado en Firebase Auth — subiendo a Storage…');
  return true;
}

async function uploadImage(localPath, storagePath) {
  const buf = readFileSync(localPath);
  const ext = localPath.toLowerCase();
  const contentType = ext.endsWith('.png')
    ? 'image/png'
    : ext.endsWith('.webp')
      ? 'image/webp'
      : 'image/jpeg';
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, buf, { contentType });
  return getDownloadURL(storageRef);
}

async function main() {
  mkdirSync(PUBLIC_IMAGES, { recursive: true });
  const map = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
  const canUploadStorage = await maybeSignIn();
  const sourceLabel = 'Archivo histórico';

  let copied = 0;
  for (const entry of map) {
    const assetPath = resolveAssetPath(entry.source);
    const destPath = join(PUBLIC_IMAGES, entry.dest);
    if (assetPath && existsSync(assetPath)) {
      copyFileSync(assetPath, destPath);
      copied += 1;
      console.log(`  Copiada: ${entry.dest}`);
    } else if (!existsSync(destPath)) {
      console.warn(`  ⚠ No encontrada: ${entry.source}`);
    }
  }
  console.log(`\n${copied} imágenes copiadas a public/images/\n`);

  const extraPoliticaPhotos = [
    {
      id: 'politica-elecciones-1968',
      title: 'Elecciones Guinea Ecuatorial 1968',
      year: '1968',
      location: 'Malabo',
      description: 'Material visual de la campaña y las elecciones presidenciales de septiembre de 1968.',
      image: 'elecciones-guinea-ecuatorial.png',
    },
    {
      id: 'politica-maletas-macias-1979',
      title: 'Militares descubren maletas con dinero en el palacio de Macías Nguema, 1979',
      year: '1979',
      location: 'Malabo',
      description: 'Tras el golpe de Estado, las fuerzas armadas localizan grandes sumas en el palacio presidencial.',
      image: 'maletas-macias-palacio-1979.png',
    },
    {
      id: 'politica-independencia-santa-isabel',
      title: 'Independencia de Guinea Ecuatorial el 12 de octubre de 1968 en Santa Isabel',
      year: '1968',
      location: 'Santa Isabel (Malabo)',
      description: 'Acto de proclamación de la independencia en la capital.',
      image: 'macias-vietnam-1970.png',
    },
    {
      id: 'politica-desfile-santa-isabel',
      title: 'Desfile militar en Santa Isabel, 1968',
      year: '1968',
      location: 'Santa Isabel (Malabo)',
      description: 'Formación de tropas durante el período de transición a la independencia.',
      image: 'politica-rail-desfile-santa-isabel.png',
    },
    {
      id: 'politica-macias-acto-publico',
      title: 'Macías Nguema en acto público',
      year: '1968',
      location: 'Malabo',
      description: 'El primer presidente en un acto oficial tras la proclamación de la República.',
      image: 'politica-rail-macias-acto-publico.png',
    },
    {
      id: 'politica-correos-santa-isabel',
      title: 'Correos, Santa Isabel',
      year: '1956',
      location: 'Santa Isabel (Malabo)',
      description: 'Edificio de correos en Santa Isabel, diciembre de 1956.',
      image: 'correos-santa-isabel-1956.png',
    },
    {
      id: 'politica-guardia-civil-trafico',
      title: 'Destacamento de Tráfico de la Guardia Civil',
      year: '1961–1969',
      location: 'Guinea Ecuatorial',
      description: 'Unidad de tráfico de la Guardia Civil durante el periodo colonial tardío.',
      image: 'guardia-civil-trafico.png',
    },
    {
      id: 'politica-independencia',
      title: 'Proclamación de la independencia',
      year: '1968',
      location: 'Guinea Ecuatorial',
      description: 'Documentación fotográfica del acto de independencia de 1968.',
      image: 'independencia-de-guinea.jpeg',
    },
  ];

  const politicaFromMap = map.filter((e) => e.category === 'politica');
  const allPolitica = [...politicaFromMap];

  for (const extra of extraPoliticaPhotos) {
    if (existsSync(join(PUBLIC_IMAGES, extra.image))) {
      allPolitica.push({
        dest: extra.image,
        title: extra.title,
        year: extra.year,
        location: extra.location,
        description: extra.description,
        category: 'politica',
        id: extra.id,
      });
    }
  }

  console.log('Escribiendo colección photos (política)…');
  for (const entry of allPolitica) {
    const localPath = join(PUBLIC_IMAGES, entry.dest);
    if (!existsSync(localPath)) continue;

    let imageUrl = `/images/${entry.dest}`;
    if (canUploadStorage) {
      try {
        imageUrl = await uploadImage(localPath, `photos/${entry.id || entry.dest}`);
      } catch (err) {
        console.warn(`  Storage falló para ${entry.dest}, usando ruta local.`, err.message);
      }
    }

    const docId =
      entry.id ||
      `politica-${entry.dest.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

    await setDoc(doc(db, 'photos', docId), {
      title: entry.title,
      year: entry.year || '',
      location: entry.location || 'Guinea Ecuatorial',
      description: entry.description || '',
      source: sourceLabel,
      imageUrl,
      category: 'politica',
      bio: '',
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ photos/${docId}`);
  }

  console.log('\nEscribiendo colección biographies (personajes históricos)…');

  const bioFromMap = map.filter((e) => e.category === 'personasHistoricas' && e.bioId);
  const fixedPoliticaBios = [
    {
      bioId: 'macias',
      name: 'Francisco Macías Nguema',
      year: '1924–1979',
      category: 'politica',
      description:
        'Francisco Macías Nguema (1924–1979) fue el primer presidente de Guinea Ecuatorial tras la independencia del país de España el 12 de octubre de 1968. Antes de la independencia ocupó varios cargos en la administración colonial y fue elegido presidente en las elecciones de 1968.\n\nDurante sus primeros años en el poder concentró progresivamente la autoridad del Estado, instauró un sistema de partido único y en 1972 fue declarado presidente vitalicio. Su gobierno estuvo marcado por la represión política, las detenciones arbitrarias, las ejecuciones y el exilio de miles de ecuatoguineanos.',
      dest: 'francisco-macias-nguema.png',
    },
  ];

  const fixedBios = [
    {
      bioId: 'ntutumu',
      name: 'Miguel Ntutumu',
      year: '1928–1979',
      description:
        'Presidente del consejo provincial, Gobernador civil de Río Muni y vicepresidente de la República de Guinea Ecuatorial.',
      dest: 'miguel-ntutumu.png',
    },
    {
      bioId: 'colonial',
      name: 'Administración colonial española',
      year: '1778–1968',
      description:
        'Durante casi dos siglos, el territorio estuvo bajo administración colonial española. La documentación fotográfica de este período constituye una fuente esencial.',
      dest: 'vida-colonial-familia.png',
    },
  ];

  const bios = [...fixedBios];
  for (const b of bioFromMap) {
    if (!bios.some((x) => x.bioId === b.bioId)) {
      bios.push({
        bioId: b.bioId,
        name: b.name || b.title,
        year: b.year,
        description: b.description,
        dest: b.dest,
      });
    }
  }

  for (const bio of bios) {
    const localPath = join(PUBLIC_IMAGES, bio.dest);
    if (!existsSync(localPath)) {
      console.warn(`  ⚠ Imagen no encontrada para biografía ${bio.bioId}: ${bio.dest}`);
      continue;
    }

    let imageUrl = `/images/${bio.dest}`;
    if (canUploadStorage) {
      try {
        imageUrl = await uploadImage(localPath, `biographies/${bio.bioId}_${bio.dest}`);
      } catch (err) {
        console.warn(`  Storage falló para ${bio.bioId}, usando ruta local.`, err.message);
      }
    }

    await setDoc(doc(db, 'biographies', bio.bioId), {
      category: 'personasHistoricas',
      name: bio.name,
      imageUrl,
      year: bio.year || '',
      description: bio.description || '',
      works: [],
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ biographies/${bio.bioId}`);
  }

  console.log('\nEscribiendo biografías (política)…');
  for (const bio of fixedPoliticaBios) {
    const localPath = join(PUBLIC_IMAGES, bio.dest);
    if (!existsSync(localPath)) {
      console.warn(`  ⚠ Imagen no encontrada para biografía ${bio.bioId}: ${bio.dest}`);
      continue;
    }

    let imageUrl = `/images/${bio.dest}`;
    if (canUploadStorage) {
      try {
        imageUrl = await uploadImage(localPath, `biographies/${bio.bioId}_${bio.dest}`);
      } catch (err) {
        console.warn(`  Storage falló para ${bio.bioId}, usando ruta local.`, err.message);
      }
    }

    await setDoc(doc(db, 'biographies', bio.bioId), {
      category: bio.category,
      name: bio.name,
      imageUrl,
      year: bio.year || '',
      description: bio.description || '',
      works: [],
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    console.log(`  ✓ biographies/${bio.bioId}`);
  }

  const photosSnap = await getDocs(collection(db, 'photos'));
  const biosSnap = await getDocs(collection(db, 'biographies'));
  console.log(`\n✅ Listo — photos: ${photosSnap.size}, biographies: ${biosSnap.size}`);
  if (!canUploadStorage) {
    console.log(
      '   Para subir también a Firebase Storage, ejecuta con FIREBASE_SEED_EMAIL y FIREBASE_SEED_PASSWORD.',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
