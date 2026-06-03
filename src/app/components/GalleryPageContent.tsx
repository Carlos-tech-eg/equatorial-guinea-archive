'use client';

import { AnimateInView } from '@/app/components/AnimateInView';
import { ArchiveMasonryGallery } from '@/app/components/ArchiveMasonryGallery';
import { ARCHIVE_GALLERY_IMAGES, type GalleryMasonryItem } from '@/data/memoriaMiniGallery';
import { HERO_FALLBACK_IMAGES } from '@/data/heroFallbackImages';

type GalleryPhoto = {
  id: string;
  title?: string | null;
  imageUrl: string | null;
};

function getFallback(index: number) {
  return HERO_FALLBACK_IMAGES[index % HERO_FALLBACK_IMAGES.length];
}

function buildGalleryItems(photos: GalleryPhoto[]): GalleryMasonryItem[] {
  const fromArchive = photos
    .filter((p) => p.imageUrl?.trim())
    .map((p, i) => ({
      src: p.imageUrl!.trim(),
      alt: p.title?.trim() || getFallback(i).alt,
    }));

  const seen = new Set<string>();
  const merged: GalleryMasonryItem[] = [];

  for (const item of [...fromArchive, ...ARCHIVE_GALLERY_IMAGES]) {
    if (seen.has(item.src)) continue;
    seen.add(item.src);
    merged.push(item);
  }

  return merged;
}

type GalleryPageContentProps = {
  photos: GalleryPhoto[];
};

export function GalleryPageContent({ photos }: GalleryPageContentProps) {
  const items = buildGalleryItems(photos);

  return (
    <div className="w-full border-y border-border/80 bg-[#f4f1ea]">
      <div className="w-full px-3 py-8 sm:px-5 sm:py-10 md:px-8 lg:px-12 lg:py-14">
        <AnimateInView>
          <h1 className="font-sans mb-8 text-center text-5xl font-light uppercase tracking-tighter text-[var(--masthead-brand,#4a3728)] sm:mb-10 sm:text-6xl md:text-7xl">
            GALERIA
          </h1>
          <ArchiveMasonryGallery items={items} />
        </AnimateInView>
      </div>
    </div>
  );
}
