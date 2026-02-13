'use client';

import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type ArchivalImageFrameProps = {
  src: string;
  alt: string;
  /** Optional caption: date, location, description */
  caption?: {
    date?: string;
    location?: string;
    description?: string;
  };
  /** Size variant: gallery card vs detail page */
  variant?: 'gallery' | 'detail';
  /** Optional index badge (e.g. "01", "02") */
  indexBadge?: string;
  className?: string;
  imageClassName?: string;
  /** Enable hover effects */
  interactive?: boolean;
  loading?: 'lazy' | 'eager';
};

export function ArchivalImageFrame({
  src,
  alt,
  caption,
  variant = 'gallery',
  indexBadge,
  className = '',
  imageClassName = '',
  interactive = true,
  loading = 'lazy',
}: ArchivalImageFrameProps) {
  const isDetail = variant === 'detail';

  return (
    <figure
      className={`group flex flex-col ${isDetail ? 'max-w-2xl mx-auto lg:mx-0' : ''} ${className}`}
    >
      {/* Museum-style frame: outer border + mat (passe-partout) + image */}
      <div
        className={`
          relative overflow-hidden
          bg-[var(--archival-mat)]
          ${isDetail ? 'p-4 sm:p-6 lg:p-8' : 'p-3 sm:p-4'}
          rounded-sm
          border
          [box-shadow:var(--archival-frame-shadow)]
          ${interactive ? 'transition-all duration-500 ease-out group-hover:border-accent-gold/30 group-hover:[box-shadow:var(--archival-frame-shadow-hover)]' : ''}
        `}
        style={{ borderColor: 'var(--archival-frame-border)' }}
      >
        {/* Image container - preserves aspect ratio, responsive max */}
        <div
          className={`
            relative flex items-center justify-center
            bg-muted/20
            overflow-hidden
            ${interactive ? 'group-hover:brightness-[0.98] transition-all duration-500' : ''}
          `}
        >
          <div className="relative w-full">
            <ImageWithFallback
              src={src}
              alt={alt}
              loading={loading}
              className={`
                w-full h-auto
                object-contain
                max-h-[280px] sm:max-h-[360px] md:max-h-[400px]
                ${isDetail ? 'max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh]' : ''}
                ${interactive ? 'transition-transform duration-700 ease-out group-hover:scale-[1.02]' : ''}
                ${imageClassName}
              `}
              style={{ objectFit: 'contain' }}
            />
            {indexBadge && (
              <span
                className="absolute top-3 right-3 rounded px-2.5 py-1 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/90 bg-background/85 backdrop-blur-sm border border-border/50"
                aria-hidden
              >
                {indexBadge}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Caption area - archival typography */}
      {(caption?.date || caption?.location || caption?.description) && (
        <figcaption className="mt-4 sm:mt-5 space-y-1 sm:space-y-2">
          {(caption.date || caption.location) && (
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.2em]">
              {[caption.date, caption.location].filter(Boolean).join(' · ')}
            </p>
          )}
          {caption.description && (
            <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed line-clamp-2 sm:line-clamp-3 font-light">
              {caption.description}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
