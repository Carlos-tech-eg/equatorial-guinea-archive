'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { usePhotos } from '@/hooks/useContent';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { ArchivalImageFrame } from '@/app/components/ArchivalImageFrame';

type PhotoDetailProps = { id: string };

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export function PhotoDetail({ id }: PhotoDetailProps) {
  const { t } = useLocale();
  const { photos, loading } = usePhotos();

  const photo = photos.find((p) => p.id === id);
  const photoIndex = photos.findIndex((p) => p.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

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

  const title = photo.title ?? '';
  const location = photo.location ?? '';
  const description = photo.description ?? '';
  const source = photo.source ?? '';

  return (
    <div className="min-h-screen w-full min-w-0" style={{ background: 'var(--archival-bg-subtle)' }}>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border"
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-[100vw]">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            {t('photo.backToGallery')}
          </Link>
        </div>
      </motion.header>

      <motion.div
        className="container mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-12 lg:py-16 max-w-[100vw]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 xl:gap-20">
          <motion.div variants={item} className="lg:col-span-7 min-w-0">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em]">
                {String(photoIndex + 1).padStart(2, '0')} {t('photo.of')}{' '}
                {String(photos.length).padStart(2, '0')}
              </p>
              <ArchivalImageFrame
                src={photo.imageUrl ?? ''}
                alt={title || 'Photo'}
                caption={{ date: photo.year ?? undefined, location: location || undefined }}
                variant="detail"
                interactive={false}
                loading="eager"
                className="max-w-2xl"
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="lg:col-span-5 space-y-6 sm:space-y-10 min-w-0">
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
                  {photo.year ?? ''}
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

            {photo.bio && (
              <div className="pt-6 sm:pt-8 border-t border-border space-y-3 sm:space-y-4">
                <h2 className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
                  Biografía
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                  {photo.bio}
                </p>
              </div>
            )}

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
                      {photos[photoIndex - 1].title}
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
                      {photos[photoIndex + 1].title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
