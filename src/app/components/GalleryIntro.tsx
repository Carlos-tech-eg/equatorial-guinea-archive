'use client';

import { motion } from 'motion/react';
import { useLocale } from '@/app/providers';

type GalleryIntroProps = {
  labelKey?: string;
  titleKey?: string;
  text1Key?: string;
  text2Key?: string;
};

export function GalleryIntro({
  labelKey = 'gallery.curatorLabel',
  titleKey = 'home.purposeTitle',
  text1Key = 'home.purpose1',
  text2Key = 'home.purpose2',
}: GalleryIntroProps) {
  const { t } = useLocale();

  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
      className="gallery-intro museum-band border-b border-border/80"
    >
      <div className="container mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-16">
        <div className="lg:col-span-4">
          <p className="gallery-intro__label">{t(labelKey)}</p>
          <h1 className="gallery-intro__title">{t(titleKey)}</h1>
        </div>
        <div className="grid gap-6 border-[var(--museum-line)] pl-0 sm:grid-cols-2 lg:col-span-8 lg:border-l lg:pl-6">
          <p className="gallery-intro__text">{t(text1Key)}</p>
          <p className="gallery-intro__text">{t(text2Key)}</p>
        </div>
      </div>
    </motion.header>
  );
}
