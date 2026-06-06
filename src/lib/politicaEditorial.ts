import type { Locale } from '@/i18n';
import type { Photo } from '@/hooks/useContent';
import {
  applyEleccionesArticleToPhoto,
  createEleccionesPhoto,
  isPoliticaEleccionesPhoto,
} from '@/data/politicaEleccionesArticle';
import {
  POLITICA_ALL_MOCK_SLOTS,
  POLITICA_GRID_MOCK_SLOTS,
  POLITICA_RAIL_MOCK_SLOTS,
  POLITICA_GOLPE_LIBERTAD_IMAGE,
  POLITICA_MACIAS_IMAGE,
  POLITICA_MALETAS_MACIAS_IMAGE,
  POLITICA_MOCK_ID_PREFIX,
  POLITICA_VIETNAM_MACIAS_IMAGE,
  isPoliticaGolpeLibertadTitle,
  isPoliticaMaciasTitle,
  isPoliticaMaletasMaciasTitle,
  isPoliticaVietnamMaciasTitle,
} from '@/data/politicaMockNews';

/** Fotos usadas en la rejilla editorial superior (3 columnas). */
export const POLITICA_EDITORIAL_FEATURED_COUNT = 5;

/** Mínimo de tarjetas en el carril «Más del archivo político». */
export const POLITICA_MIN_RAIL_COUNT = 8;

export const POLITICA_MIN_DISPLAY_COUNT =
  POLITICA_EDITORIAL_FEATURED_COUNT + POLITICA_MIN_RAIL_COUNT;

function mockSlotToPhoto(
  slot: (typeof POLITICA_ALL_MOCK_SLOTS)[number],
  index: number,
  t: (key: string) => string,
): Photo {
  return {
    id: `${POLITICA_MOCK_ID_PREFIX}${index}`,
    title: t(slot.titleKey),
    description: t(slot.descriptionKey),
    imageUrl: slot.imageUrl,
    year: slot.year,
    location: slot.location,
    source: t('biografias.politicaMockNews.sourceLabel'),
    category: 'politica',
  };
}

function applyPoliticaStoryOverrides(photo: Photo, t: (key: string) => string): Photo {
  if (isPoliticaVietnamMaciasTitle(photo.title)) {
    return {
      ...photo,
      imageUrl: POLITICA_VIETNAM_MACIAS_IMAGE,
      title: t('biografias.politicaEditorial.left2.title'),
      description: t('biografias.politicaEditorial.left2.summary'),
      year: '1968',
      location: photo.location?.trim() || 'Santa Isabel (Malabo)',
    };
  }
  return photo;
}

function enrichPhotoWithMockImage(photo: Photo, imageIndex: number): Photo {
  if (isPoliticaVietnamMaciasTitle(photo.title)) {
    return { ...photo, imageUrl: POLITICA_VIETNAM_MACIAS_IMAGE };
  }
  if (isPoliticaGolpeLibertadTitle(photo.title)) {
    return { ...photo, imageUrl: POLITICA_GOLPE_LIBERTAD_IMAGE };
  }
  if (isPoliticaMaletasMaciasTitle(photo.title)) {
    return { ...photo, imageUrl: POLITICA_MALETAS_MACIAS_IMAGE };
  }
  if (isPoliticaMaciasTitle(photo.title) && !isPoliticaMaletasMaciasTitle(photo.title)) {
    return { ...photo, imageUrl: POLITICA_MACIAS_IMAGE };
  }
  const url = photo.imageUrl?.trim();
  if (url) return photo;
  const slot = POLITICA_ALL_MOCK_SLOTS[imageIndex % POLITICA_ALL_MOCK_SLOTS.length];
  return { ...photo, imageUrl: slot.imageUrl };
}

/**
 * Combina fotos reales (con imagen ficticia si falta URL) y rellena hasta
 * 5 piezas editoriales + 8 del carril con noticias de demostración.
 */
export function buildPoliticaDisplayPhotos(
  realPhotos: Photo[],
  t: (key: string) => string,
  locale: Locale,
): Photo[] {
  const enriched = realPhotos.map((p, i) =>
    applyPoliticaStoryOverrides(
      applyEleccionesArticleToPhoto(enrichPhotoWithMockImage(p, i), locale),
      t,
    ),
  );
  const result = enriched.filter((p) => !isPoliticaEleccionesPhoto(p));
  result.unshift(createEleccionesPhoto(locale));

  for (let mockIndex = 0; result.length < POLITICA_MIN_DISPLAY_COUNT; mockIndex += 1) {
    const slot = POLITICA_ALL_MOCK_SLOTS[mockIndex % POLITICA_ALL_MOCK_SLOTS.length];
    const id = `${POLITICA_MOCK_ID_PREFIX}${mockIndex}`;
    if (result.some((p) => p.id === id)) continue;
    result.push(mockSlotToPhoto(slot, mockIndex, t));
  }

  return result.filter((p) => Boolean(p.imageUrl?.trim()));
}

export function getPoliticaOverflowPhotos(photos: Photo[]): Photo[] {
  return photos
    .filter((p) => Boolean(p.imageUrl?.trim()))
    .slice(POLITICA_EDITORIAL_FEATURED_COUNT);
}

/** Tarjetas del carril «Más del archivo político». */
export function getPoliticaRailPhotos(t: (key: string) => string): Photo[] {
  return POLITICA_RAIL_MOCK_SLOTS.map((slot, i) =>
    mockSlotToPhoto(slot, POLITICA_GRID_MOCK_SLOTS.length + i, t),
  );
}

/** Resuelve una noticia política (Firebase o ficticia) por id. */
export function resolvePoliticaPhotoById(
  id: string,
  realPhotos: Photo[],
  t: (key: string) => string,
  locale: Locale,
): Photo | undefined {
  if (id === createEleccionesPhoto(locale).id) {
    return createEleccionesPhoto(locale);
  }
  const display = buildPoliticaDisplayPhotos(realPhotos, t, locale);
  const fromDisplay = display.find((p) => p.id === id);
  if (fromDisplay) return fromDisplay;

  const real = realPhotos.find((p) => p.id === id);
  if (real) {
    return applyPoliticaStoryOverrides(
      applyEleccionesArticleToPhoto(enrichPhotoWithMockImage(real, 0), locale),
      t,
    );
  }
  return undefined;
}
