'use client';

import Link from 'next/link';
import { photos } from '@/data/photos';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function Gallery() {
  const { t, tp } = useLocale();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20">
          <p className="text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-muted-foreground mb-4 sm:mb-6">
            {t('gallery.label')}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground mb-6 sm:mb-8">
            {t('gallery.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {photos.map((photo, index) => (
            <Link
              key={photo.id}
              href={`/photo/${photo.id}`}
              className="group block no-underline"
            >
              <article className="space-y-4 sm:space-y-6">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] bg-muted/30">
                    <ImageWithFallback
                      src={photo.imageUrl}
                      alt={tp(photo.id, 'title')}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-xs text-muted-foreground tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.15em]">
                    <span>{photo.year}</span>
                    <span className="text-border">·</span>
                    <span>{tp(photo.id, 'location')}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light text-foreground group-hover:text-muted-foreground transition-colors leading-tight">
                    {tp(photo.id, 'title')}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                    {tp(photo.id, 'description')}
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
