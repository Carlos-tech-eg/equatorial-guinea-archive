'use client';

import { usePhotos } from '@/hooks/useContent';
import { useLocale } from '@/app/providers';
import { GalleryPageContent } from '@/app/components/GalleryPageContent';

export function Gallery() {
  const { t } = useLocale();
  const { photos, loading } = usePhotos();

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-[#F3EEE6]">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--nav-accent,#9b7b39)]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F3EEE6]" aria-label={t('memoria.sections.documentos')}>
      <header className="border-b border-border/80 bg-[#f4f1ea]">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--museum-amber)]">
            {t('memoria.label')}
          </p>
          <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            {t('memoria.sections.documentos')}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('gallery.subtitle')}
          </p>
        </div>
      </header>
      <GalleryPageContent photos={photos} showTitle={false} />
    </main>
  );
}
