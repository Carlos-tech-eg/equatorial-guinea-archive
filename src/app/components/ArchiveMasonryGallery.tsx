'use client';

import { useState, useCallback, type SyntheticEvent } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { GalleryLightbox } from '@/app/components/GalleryLightbox';
import type { GalleryMasonryItem } from '@/data/memoriaMiniGallery';
import {
  getHomeGalleryWallSlot,
  getMasonryTileSize,
  masonrySizeFromAspect,
  type MasonryTileSize,
} from '@/lib/masonryLayout';

type ArchiveMasonryGalleryProps = {
  items: GalleryMasonryItem[];
  compact?: boolean;
  hideCaptions?: boolean;
  /** Muro fijo de 5 piezas tras el hero (solo desktop). */
  homeWallLayout?: boolean;
};

function MasonryCaption({
  item,
  hidden,
}: {
  item: GalleryMasonryItem;
  hidden?: boolean;
}) {
  if (hidden) return null;
  const text = item.caption?.trim() || item.alt?.trim();
  const date = item.date?.trim();
  if (!text && !date) return null;

  return (
    <figcaption className="gallery-mosaic__caption">
      {text ? <p className="gallery-mosaic__caption-text">{text}</p> : null}
      {date ? <p className="gallery-mosaic__caption-date">{date}</p> : null}
    </figcaption>
  );
}

function MasonryTile({
  item,
  index,
  onOpen,
  hideCaptions,
  homeWallLayout,
}: {
  item: GalleryMasonryItem;
  index: number;
  onOpen: (item: GalleryMasonryItem) => void;
  hideCaptions?: boolean;
  homeWallLayout?: boolean;
}) {
  const [hidden, setHidden] = useState(false);
  const wallSlot = homeWallLayout ? getHomeGalleryWallSlot(index) : null;
  const [size, setSize] = useState<MasonryTileSize>(() =>
    getMasonryTileSize(index, item.layout),
  );

  if (hidden || !item.src?.trim()) return null;

  const isLocalImage =
    item.src.startsWith('/') && !item.src.startsWith('//');

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if (wallSlot) return;
    const img = event.currentTarget;
    const fromAspect = masonrySizeFromAspect(img.naturalWidth, img.naturalHeight);
    if (fromAspect && !item.layout) {
      setSize(fromAspect);
    }
  };

  const cellClass = wallSlot
    ? `gallery-mosaic__cell gallery-mosaic__cell--home-${wallSlot}`
    : `gallery-mosaic__cell gallery-mosaic__cell--${size}`;

  return (
    <figure className={cellClass}>
      <button
        type="button"
        className="gallery-mosaic__trigger"
        onClick={() => onOpen(item)}
        aria-label={`Ver imagen: ${item.alt}`}
      >
        <div className="gallery-mosaic__media">
          <ImageWithFallback
            src={item.src}
            alt={item.alt}
            hideOnError={!isLocalImage}
            onHidden={() => setHidden(true)}
            onLoad={handleLoad}
            className="gallery-mosaic__img"
          />
        </div>
        <MasonryCaption item={item} hidden={hideCaptions} />
      </button>
    </figure>
  );
}

export function ArchiveMasonryGallery({
  items,
  compact = false,
  hideCaptions = false,
  homeWallLayout = false,
}: ArchiveMasonryGalleryProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryMasonryItem | null>(null);
  const validItems = items.filter((item) => item.src?.trim());

  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  if (!validItems.length) return null;

  return (
    <>
      <div
        className={`gallery-mosaic${compact ? ' gallery-mosaic--compact' : ''}${
          homeWallLayout ? ' gallery-mosaic--home-wall' : ''
        }`}
        aria-label="Galería fotográfica del archivo"
      >
        {validItems.map((item, index) => (
          <MasonryTile
            key={`${item.src}-${index}`}
            item={item}
            index={index}
            onOpen={setLightboxItem}
            hideCaptions={hideCaptions}
            homeWallLayout={homeWallLayout}
          />
        ))}
      </div>
      {lightboxItem ? <GalleryLightbox item={lightboxItem} onClose={closeLightbox} /> : null}
    </>
  );
}
