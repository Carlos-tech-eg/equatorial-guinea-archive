'use client';

import Link from 'next/link';
import { photos } from '@/data/photos';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type PhotoDetailProps = { id: string };

export function PhotoDetail({ id }: PhotoDetailProps) {
  const { t, tp } = useLocale();
  const photo = photos.find((p) => p.id === id);
  const photoIndex = photos.findIndex((p) => p.id === id);

  if (!photo) {
    return (
      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-12 sm:py-24 text-center max-w-[100vw]">
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground mb-6">
          {t('photo.notFound')}
        </h2>
        <Link
          href="/gallery"
          className="text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors"
        >
          {t('photo.returnToGallery')}
        </Link>
      </div>
    );
  }

  const title = tp(photo.id, 'title');
  const location = tp(photo.id, 'location');
  const description = tp(photo.id, 'description');
  const source = tp(photo.id, 'source');

  return (
    <div className="min-h-screen w-full min-w-0">
      <header className="border-b border-border">
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-[100vw]">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            {t('photo.backToGallery')}
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-12 lg:py-16 max-w-[100vw]">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-7 min-w-0">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 sm:mb-6 text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em]">
                {String(photoIndex + 1).padStart(2, '0')} {t('photo.of')}{' '}
                {String(photos.length).padStart(2, '0')}
              </p>
              <div className="bg-card border border-border p-3 sm:p-6 lg:p-8 xl:p-10 rounded-xl overflow-hidden">
                <div className="bg-muted/50 min-w-0">
                  <ImageWithFallback
                    src={photo.imageUrl}
                    alt={title}
                    className="w-full h-auto max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 sm:space-y-10 min-w-0">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 sm:mb-6 leading-tight break-words">
                {title}
              </h1>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>

            <dl className="space-y-6 sm:space-y-8">
              <div>
                <dt className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {t('photo.date')}
                </dt>
                <dd className="text-lg sm:text-xl font-light text-foreground">
                  {photo.year}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {t('photo.location')}
                </dt>
                <dd className="text-lg sm:text-xl font-light text-foreground">
                  {location}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {t('photo.source')}
                </dt>
                <dd className="text-lg sm:text-xl font-light text-foreground">
                  {source}
                </dd>
              </div>
            </dl>

            <div className="pt-6 sm:pt-8 border-t border-border space-y-3 sm:space-y-4">
              <h2 className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
                {t('photo.context')}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {description}
              </p>
            </div>

            <div className="pt-6 sm:pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                {photoIndex > 0 && (
                  <Link
                    href={`/photo/${photos[photoIndex - 1].id}`}
                    className="group flex-1 min-w-0"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                      {t('photo.previous')}
                    </p>
                    <p className="font-serif text-base sm:text-lg text-foreground group-hover:text-muted-foreground transition-colors truncate">
                      {tp(photos[photoIndex - 1].id, 'title')}
                    </p>
                  </Link>
                )}
                {photoIndex < photos.length - 1 && (
                  <Link
                    href={`/photo/${photos[photoIndex + 1].id}`}
                    className="group flex-1 min-w-0 sm:text-right"
                  >
                    <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                      {t('photo.next')}
                    </p>
                    <p className="font-serif text-base sm:text-lg text-foreground group-hover:text-muted-foreground transition-colors truncate">
                      {tp(photos[photoIndex + 1].id, 'title')}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
