'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { usePhotos } from '@/hooks/useContent';
import { useLocale } from '@/app/providers';
import { ArchivalImageFrame } from '@/app/components/ArchivalImageFrame';

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export function Gallery() {
  const { t } = useLocale();
  const { photos, loading } = usePhotos();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0" style={{ background: 'var(--archival-bg-subtle)' }}>
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative overflow-hidden border-b border-border"
      >
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
      </motion.header>

      <motion.div
        className="container gallery-container mx-auto px-3 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-24 max-w-[100vw]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16">
          {photos.map((photo, index) => (
            <motion.article key={photo.id} variants={item} className="flex flex-col">
              <Link href={`/photo/${photo.id}`} className="group block no-underline flex-1 flex flex-col">
                <ArchivalImageFrame
                  src={photo.imageUrl ?? ''}
                  alt={photo.title ?? 'Photo'}
                  caption={{
                    date: photo.year ?? undefined,
                    location: photo.location ?? undefined,
                  }}
                  variant="gallery"
                  indexBadge={String(index + 1).padStart(2, '0')}
                  interactive
                  loading="lazy"
                />
                <div className="mt-4 sm:mt-5 px-0.5 space-y-1.5 sm:space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-light text-foreground group-hover:text-accent-gold transition-colors duration-300 leading-tight">
                    {photo.title ?? '(No title)'}
                  </h3>
                  {photo.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 font-light">
                      {photo.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
