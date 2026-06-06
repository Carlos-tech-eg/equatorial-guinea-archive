import type { BiografiaCategory } from '@/data/biografias';

/** Valores guardados en Firestore (admin Select). */
export const PHOTO_CATEGORY_SLUGS = [
  'cultura',
  'musica',
  'personasHistoricas',
  'politica',
  'deporte',
  'otro',
] as const;

export type PhotoCategorySlug = (typeof PHOTO_CATEGORY_SLUGS)[number];

const SLUG_SET = new Set<string>(PHOTO_CATEGORY_SLUGS);

/** Normaliza categoría escrita a mano o con acentos → slug del admin. */
export function normalizePhotoCategory(raw?: string | null): PhotoCategorySlug | '' {
  if (!raw?.trim()) return '';

  const folded = raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, '');

  if (SLUG_SET.has(folded)) return folded as PhotoCategorySlug;

  if (folded.includes('politic') || folded.includes('instituc')) return 'politica';
  if (folded.includes('music') || folded.includes('arte')) return 'musica';
  if (folded.includes('cultur') || folded.includes('tradicion')) return 'cultura';
  if (folded.includes('persona') || folded.includes('histor')) return 'personasHistoricas';
  if (folded.includes('deporte') || folded.includes('sport') || folded.includes('futbol'))
    return 'deporte';

  return '';
}

export function photoMatchesCategory(
  photoCategory: string | undefined | null,
  target: BiografiaCategory,
): boolean {
  return normalizePhotoCategory(photoCategory) === target;
}
