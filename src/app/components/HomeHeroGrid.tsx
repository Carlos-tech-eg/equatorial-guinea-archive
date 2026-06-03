'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { usePhotos } from '@/hooks/useContent';
import { HERO_FALLBACK_IMAGES } from '@/data/heroFallbackImages';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Layout: [0 large horiz][1 tall] [2 wide horiz][3 square] [4 vertical] - constrained heights
const GRID_LAYOUT = [
  { grid: 'sm:col-span-2 sm:row-span-1 sm:col-start-1 sm:row-start-1', aspect: 'aspect-[4/3]', maxH: 'max-h-[180px] sm:max-h-[220px] lg:max-h-[260px]' },
  { grid: 'sm:col-span-1 sm:row-span-2 sm:col-start-3 sm:row-start-1', aspect: 'aspect-[3/4]', maxH: 'max-h-[220px] sm:max-h-[280px] lg:max-h-[320px]' },
  { grid: 'sm:col-span-2 sm:row-span-1 sm:col-start-1 sm:row-start-2', aspect: 'aspect-[16/9]', maxH: 'max-h-[120px] sm:max-h-[150px] lg:max-h-[180px]' },
  { grid: 'sm:col-span-1 sm:row-span-1 sm:col-start-3 sm:row-start-2', aspect: 'aspect-square', maxH: 'max-h-[140px] sm:max-h-[180px] lg:max-h-[200px]' },
  { grid: 'sm:col-span-1 sm:row-span-1 sm:col-start-3 sm:row-start-3', aspect: 'aspect-[3/4]', maxH: 'max-h-[140px] sm:max-h-[180px] lg:max-h-[200px]' },
];

export function HomeHeroGrid() {
  const { photos, loading } = usePhotos();

  const needCount = 5;
  const items =
    photos.length >= needCount
      ? photos.slice(0, needCount).map((p) => ({
          src: p.imageUrl ?? '',
          alt: p.title ?? 'Photo',
          year: p.year ?? '',
          location: p.location ?? '',
          id: p.id,
        }))
      : [
          ...photos.map((p) => ({
            src: p.imageUrl ?? '',
            alt: p.title ?? 'Photo',
            year: p.year ?? '',
            location: p.location ?? '',
            id: p.id,
          })),
          ...HERO_FALLBACK_IMAGES.slice(0, needCount - photos.length).map((img) => ({
            src: img.src,
            alt: img.alt,
            year: img.year,
            location: img.location,
            id: undefined as string | undefined,
          })),
        ];

  if (loading && items.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-h-[400px] place-items-center">
        <div className="animate-pulse col-span-full w-full max-w-md h-8 bg-muted/50 rounded" />
      </div>
    );
  }

  return (
    <section className="w-full min-w-0" style={{ background: 'var(--archival-bg-subtle)' }}>
      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16 max-w-[100vw] max-w-5xl">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 grid-rows-[auto_auto_auto]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {items.map((item, index) => {
            const layout = GRID_LAYOUT[index];
            const fb = HERO_FALLBACK_IMAGES[index % HERO_FALLBACK_IMAGES.length]?.src ?? '';
            const primary = item.src.trim();
            const content = (
                  <div
                    className={`
                      h-full w-full overflow-hidden rounded-sm
                      bg-[var(--archival-mat)] p-2 sm:p-3
                      border border-[var(--archival-frame-border)]
                      shadow-[var(--archival-frame-shadow)]
                      transition-all duration-500 ease-out
                      group-hover:shadow-[var(--archival-frame-shadow-hover)]
                      group-hover:border-accent-gold/30
                    `}
                    style={{ borderColor: 'var(--archival-frame-border)' }}
                  >
                    <div
                      className={`relative w-full h-full ${layout.aspect} ${layout.maxH} overflow-hidden bg-muted/20`}
                    >
                      <ImageWithFallback
                        src={primary || fb}
                        fallbackSrc={primary ? fb : undefined}
                        alt={item.alt}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] [filter:sepia(0.12)] group-hover:[filter:sepia(0)]"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3">
                        <p className="text-[10px] sm:text-xs text-white/95 uppercase tracking-wider truncate">
                          {(item.year || item.location) &&
                            [item.year, item.location].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                    </div>
                  </div>
            );

            return (
              <motion.div
                key={item.id ?? `fallback-${index}`}
                className={layout.grid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {item.id ? (
                  <Link href={`/photo/${item.id}`} className="block no-underline group">
                    {content}
                  </Link>
                ) : (
                  <div className="block group">{content}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
