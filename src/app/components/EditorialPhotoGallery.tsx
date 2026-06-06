'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { GalleryIntro } from '@/app/components/GalleryIntro';
import { GalleryCard } from '@/app/components/GalleryCard';
import type { Photo } from '@/hooks/useContent';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

type EditorialPhotoGalleryProps = {
  photos: Photo[];
  loading: boolean;
  showBackLink?: boolean;
  hideIntro?: boolean;
  /** Solo rejilla, sin envoltorio de página completa. */
  embedded?: boolean;
  intro?: {
    labelKey?: string;
    titleKey?: string;
    text1Key?: string;
    text2Key?: string;
  };
  emptyHint?: string;
};

export function EditorialPhotoGallery({
  photos,
  loading,
  showBackLink = false,
  hideIntro = false,
  embedded = false,
  intro,
  emptyHint,
}: EditorialPhotoGalleryProps) {
  const { t } = useLocale();

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#2c2419]" />
      </div>
    );
  }

  const grid = (
    <motion.section
        className="gallery-grid-section"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.04 }}
      >
        {photos.length === 0 ? (
          <p className="max-w-xl mx-auto px-6 py-16 text-center text-sm leading-relaxed text-[#5c4d3d]">
            {emptyHint ?? t('gallery.empty')}
          </p>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo) => (
              <motion.div key={photo.id} variants={item} className="gallery-grid__cell">
                <GalleryCard photo={photo} defaultTag={t('biografias.collectionSlides.politica.tema')} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
  );

  if (embedded && hideIntro) {
    return grid;
  }

  return (
    <div className="gallery-page min-h-screen w-full min-w-0">
      {showBackLink ? (
        <div className="border-b border-border/80 bg-[#f4f1ea]">
          <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
            <Link
              href="/biografias"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c4d3d] transition hover:text-[#2c2419]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {t('biografias.backToBiografias')}
            </Link>
          </div>
        </div>
      ) : null}

      {!hideIntro ? <GalleryIntro {...intro} /> : null}

      {grid}
    </div>
  );
}
