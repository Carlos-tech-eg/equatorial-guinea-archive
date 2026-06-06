'use client';

import { AnimateInView } from '@/app/components/AnimateInView';
import { ArchiveMasonryGallery } from '@/app/components/ArchiveMasonryGallery';
import { buildGalleryItems, type GalleryPhotoInput } from '@/lib/buildGalleryItems';

type GalleryPageContentProps = {
  photos: GalleryPhotoInput[];
  showTitle?: boolean;
  /** Límite de piezas (p. ej. inicio = 5). */
  maxItems?: number;
  /** Muro editorial de 5 fotos (solo desktop; móvil en columna). */
  homeWallLayout?: boolean;
};

export function GalleryPageContent({
  photos,
  showTitle = true,
  maxItems,
  homeWallLayout = false,
}: GalleryPageContentProps) {
  const allItems = buildGalleryItems(photos, { preferStaticFirst: true });
  const items = maxItems != null ? allItems.slice(0, maxItems) : allItems;

  return (
    <div className="w-full border-y border-border/80 bg-[#F3EEE6]">
      <div className="w-full px-3 py-8 sm:px-5 sm:py-10 md:px-8 lg:px-12 lg:py-14">
        <AnimateInView amount={0.05}>
          {showTitle ? (
            <h1 className="font-sans mb-8 text-center text-5xl font-light uppercase tracking-tighter text-[var(--masthead-brand,#4a3728)] sm:mb-10 sm:text-6xl md:text-7xl">
              GALERIA
            </h1>
          ) : null}
          <ArchiveMasonryGallery items={items} homeWallLayout={homeWallLayout} />
        </AnimateInView>
      </div>
    </div>
  );
}
