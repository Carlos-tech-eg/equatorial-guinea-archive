'use client';

import Link from 'next/link';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useLocale } from '@/app/providers';
import type { Photo } from '@/hooks/useContent';

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return 1;
  return Math.max(1, Math.ceil(words / 180));
}

function formatCardDate(year: string): string {
  const y = year?.trim();
  if (!y) return '—';
  if (/^\d{4}$/.test(y)) return y;
  return y;
}

function cardTag(photo: Photo, fallback?: string): string {
  const tag = photo.category?.trim() || photo.location?.trim();
  if (!tag) return fallback || 'ARCHIVO';
  return tag.length > 24 ? `${tag.slice(0, 22)}…` : tag.toUpperCase();
}

type GalleryCardProps = {
  photo: Photo;
  defaultTag?: string;
};

export function GalleryCard({ photo, defaultTag }: GalleryCardProps) {
  const { t } = useLocale();
  const minutes = readingMinutes(photo.description ?? '');
  const source = photo.source?.trim() || t('gallery.defaultSource');

  return (
    <article className="gallery-card">
      <Link href={`/photo/${photo.id}`} className="gallery-card__link">
        <header className="gallery-card__meta">
          <time dateTime={photo.year}>{formatCardDate(photo.year)}</time>
          <span className="gallery-card__tag">{cardTag(photo, defaultTag)}</span>
        </header>

        <div className="gallery-card__media">
          <ImageWithFallback
            src={photo.imageUrl ?? ''}
            alt={photo.title || 'Fotografía del archivo'}
            loading="lazy"
            className="gallery-card__img"
          />
        </div>

        <h2 className="gallery-card__title">{photo.title?.trim() || t('gallery.untitled')}</h2>

        {photo.description?.trim() ? (
          <p className="gallery-card__desc">{photo.description}</p>
        ) : null}

        <footer className="gallery-card__footer">
          <span className="gallery-card__by">
            <span className="gallery-card__by-label">{t('gallery.textBy')}</span>{' '}
            {source}
          </span>
          <span className="gallery-card__duration">
            {t('gallery.duration')} {minutes} Min
          </span>
        </footer>
      </Link>
    </article>
  );
}
