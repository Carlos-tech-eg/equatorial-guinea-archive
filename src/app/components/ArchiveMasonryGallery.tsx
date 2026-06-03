'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { GalleryMasonryItem } from '@/data/memoriaMiniGallery';

type ArchiveMasonryGalleryProps = {
  items: GalleryMasonryItem[];
  /** Enlace para imágenes sin ficha propia (archivo estático). */
  linkFallback?: string;
};

function MasonryItem({
  item,
  linkFallback,
}: {
  item: GalleryMasonryItem;
  linkFallback?: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden || !item.src?.trim()) return null;

  const href = item.href ?? linkFallback;
  const image = (
    <ImageWithFallback
      src={item.src}
      alt={item.alt}
      hideOnError
      onHidden={() => setHidden(true)}
      className="gallery-masonry__img"
    />
  );

  const figure = <figure className="gallery-masonry__item">{image}</figure>;

  if (!href) return figure;

  return (
    <Link
      href={href}
      className="gallery-masonry__link block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--museum-amber)]"
    >
      {figure}
    </Link>
  );
}

export function ArchiveMasonryGallery({ items, linkFallback }: ArchiveMasonryGalleryProps) {
  const validItems = items.filter((item) => item.src?.trim());
  if (!validItems.length) return null;

  return (
    <div className="gallery-masonry" aria-label="Galería fotográfica del archivo">
      {validItems.map((item, index) => (
        <MasonryItem key={`${item.src}-${index}`} item={item} linkFallback={linkFallback} />
      ))}
    </div>
  );
}
