'use client';

import { usePhotos } from '@/hooks/useContent';
import { GalleryPageContent } from '@/app/components/GalleryPageContent';

export function Gallery() {
  const { photos, loading } = usePhotos();

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#f4f1ea]">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--nav-accent,#9b7b39)]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#f4f1ea]" aria-label="Galería">
      <GalleryPageContent photos={photos} />
    </main>
  );
}
