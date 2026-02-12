'use client';

import Link from 'next/link';
// import { photos } from '@/data/photos';
import { usePhotos } from '@/hooks/useContent';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Gallery() {
  const { t, tp } = useLocale();
  const { photos, loading } = usePhotos();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0">
      <header className="relative overflow-hidden border-b border-border">
        {/* ... header content ... */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-14 lg:py-20 relative max-w-[100vw]">
          <p className="text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-accent-gold mb-4 sm:mb-6">
            {t('gallery.label')}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground mb-4 sm:mb-8 break-words">
            {t('gallery.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl w-full leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-16 lg:py-24 max-w-[100vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 lg:gap-14">
          {photos.map((photo, index) => (
            <Link
              key={photo.id}
              href={`/photo/${photo.id}`}
              className="group block no-underline"
            >
              <article className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-accent-gold/20 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] bg-muted/30">
                    <ImageWithFallback
                      src={photo.imageUrl ?? ''}
                      alt={photo.title ?? 'Photo'}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute top-3 right-3 rounded-lg bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs text-muted-foreground tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 space-y-2 sm:space-y-3">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.15em]">
                    <span>{photo.year ?? ''}</span>
                    {(photo.year ?? photo.location) && <span className="text-border">·</span>}
                    <span>{photo.location ?? ''}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-foreground group-hover:text-accent-gold transition-colors leading-tight">
                    {photo.title ?? '(No title)'}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                    {photo.description ?? ''}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
