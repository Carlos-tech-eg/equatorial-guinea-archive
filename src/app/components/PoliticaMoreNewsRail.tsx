'use client';

import { useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { Photo } from '@/hooks/useContent';

type PoliticaMoreNewsRailProps = {
  photos: Photo[];
};

function PoliticaRailCard({
  photo,
  categoryLabel,
}: {
  photo: Photo;
  categoryLabel: string;
}) {
  const { t } = useLocale();
  const title = photo.title?.trim() || t('gallery.untitled');

  return (
    <article className="politica-rail__card">
      <Link href={`/photo/${photo.id}`} className="politica-rail__link">
        <div className="politica-rail__media">
          <ImageWithFallback
            src={photo.imageUrl ?? ''}
            alt={title}
            loading="lazy"
            className="politica-rail__img"
          />
        </div>
        <p className="politica-rail__label">{categoryLabel}</p>
        <h3 className="politica-rail__title">{title}</h3>
      </Link>
    </article>
  );
}

export function PoliticaMoreNewsRail({ photos }: PoliticaMoreNewsRailProps) {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const categoryLabel = t('biografias.collectionSlides.politica.tema');

  const scroll = useCallback((direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.85, 320);
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  if (photos.length === 0) return null;

  return (
    <section className="politica-more-rail" aria-label={t('biografias.politicaMoreNews.sectionTitle')}>
      <div className="politica-more-rail__inner container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="politica-more-rail__header">
          <h2 className="politica-more-rail__heading">
            <span>{t('biografias.politicaMoreNews.sectionTitle')}</span>
            <span className="politica-more-rail__chevron" aria-hidden>
              {' '}
              &gt;
            </span>
          </h2>
          <div className="politica-more-rail__nav">
            <button
              type="button"
              className="politica-more-rail__nav-btn"
              aria-label={t('biografias.politicaMoreNews.prev')}
              onClick={() => scroll(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="politica-more-rail__nav-btn"
              aria-label={t('biografias.politicaMoreNews.next')}
              onClick={() => scroll(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="politica-more-rail__track">
          {photos.map((photo) => (
            <PoliticaRailCard key={photo.id} photo={photo} categoryLabel={categoryLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
