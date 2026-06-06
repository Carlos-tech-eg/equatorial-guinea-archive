import { ARCHIVE_GALLERY_IMAGES, type GalleryMasonryItem } from '@/data/memoriaMiniGallery';
import { HERO_FALLBACK_IMAGES } from '@/data/heroFallbackImages';
import { assignMasonryLayouts } from '@/lib/masonryLayout';

export type GalleryPhotoInput = {
  id?: string;
  title?: string | null;
  imageUrl: string | null;
  year?: string | null;
  description?: string | null;
};

function getFallback(index: number) {
  return HERO_FALLBACK_IMAGES[index % HERO_FALLBACK_IMAGES.length];
}

export type BuildGalleryItemsOptions = {
  /** Imágenes locales del archivo primero (inicio, URLs Firebase rotas). */
  preferStaticFirst?: boolean;
};

export function buildGalleryItems(
  photos: GalleryPhotoInput[],
  options?: BuildGalleryItemsOptions,
): GalleryMasonryItem[] {
  const fromArchive = photos
    .filter((p) => p.imageUrl?.trim())
    .map((p, i) => {
      const title = p.title?.trim();
      const desc = p.description?.trim();
      return {
        src: p.imageUrl!.trim(),
        alt: title || getFallback(i).alt,
        caption: desc || title || undefined,
        date: p.year?.trim() || undefined,
        href: p.id ? `/photo/${p.id}` : undefined,
      };
    });

  const ordered = options?.preferStaticFirst
    ? [...ARCHIVE_GALLERY_IMAGES, ...fromArchive]
    : [...fromArchive, ...ARCHIVE_GALLERY_IMAGES];

  const seen = new Set<string>();
  const merged: GalleryMasonryItem[] = [];

  for (const item of ordered) {
    if (seen.has(item.src)) continue;
    seen.add(item.src);
    merged.push(item);
  }

  return assignMasonryLayouts(merged);
}
