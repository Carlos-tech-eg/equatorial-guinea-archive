import type { GalleryMasonryItem } from '@/data/memoriaMiniGallery';

/** Variantes de mosaico: pequeña, media, destacada, vertical, horizontal. */
export type MasonryTileSize = 'sm' | 'md' | 'lg' | 'tall' | 'wide';

export type GalleryMasonryItemWithLayout = GalleryMasonryItem & {
  layout?: MasonryTileSize;
};

const LAYOUT_CYCLE: MasonryTileSize[] = [
  'lg',
  'sm',
  'tall',
  'md',
  'wide',
  'sm',
  'tall',
  'md',
  'lg',
  'wide',
  'md',
  'sm',
];

export function getMasonryTileSize(
  index: number,
  explicit?: MasonryTileSize,
): MasonryTileSize {
  if (explicit) return explicit;
  return LAYOUT_CYCLE[index % LAYOUT_CYCLE.length] ?? 'md';
}

/** Ajusta el tamaño según la proporción real de la imagen. */
export function masonrySizeFromAspect(
  width: number,
  height: number,
): MasonryTileSize | null {
  if (width < 1 || height < 1) return null;
  const ratio = width / height;
  if (ratio >= 1.45) return 'wide';
  if (ratio <= 0.72) return 'tall';
  if (ratio >= 1.12 && ratio < 1.45) return 'lg';
  if (ratio > 0.92 && ratio < 1.05) return 'sm';
  return null;
}

export function assignMasonryLayouts(
  items: GalleryMasonryItem[],
): GalleryMasonryItemWithLayout[] {
  return items.map((item, index) => ({
    ...item,
    layout: item.layout ?? getMasonryTileSize(index),
  }));
}

/** Posiciones del muro de 5 fotos en inicio (solo desktop). */
export const HOME_GALLERY_WALL_SLOTS = ['a', 'b', 'c', 'd', 'e'] as const;
export type HomeGalleryWallSlot = (typeof HOME_GALLERY_WALL_SLOTS)[number];

export function getHomeGalleryWallSlot(index: number): HomeGalleryWallSlot | null {
  return HOME_GALLERY_WALL_SLOTS[index] ?? null;
}
