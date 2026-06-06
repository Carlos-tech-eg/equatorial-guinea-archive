'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { GalleryMasonryItem } from '@/data/memoriaMiniGallery';

type GalleryLightboxProps = {
  item: GalleryMasonryItem;
  onClose: () => void;
};

export function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const caption = item.caption?.trim() || item.alt?.trim();
  const date = item.date?.trim();

  return (
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
    >
      <button
        type="button"
        className="gallery-lightbox__close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="gallery-lightbox__panel" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-lightbox__media">
          <ImageWithFallback
            src={item.src}
            alt={item.alt}
            className="gallery-lightbox__img"
          />
        </div>
        {(caption || date || item.href) && (
          <div className="gallery-lightbox__meta">
            {caption ? <p className="gallery-lightbox__caption">{caption}</p> : null}
            {date ? <p className="gallery-lightbox__date">{date}</p> : null}
            {item.href ? (
              <Link href={item.href} className="gallery-lightbox__ficha" onClick={onClose}>
                Ver ficha completa
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
