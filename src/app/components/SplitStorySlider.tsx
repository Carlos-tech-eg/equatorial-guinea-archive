'use client';

import Link from 'next/link';
import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type SplitStorySlide = {
  meta: string;
  categoria: string;
  titulo: string;
  extracto: string;
  imagen: string;
  href?: string;
  ctaLabel?: string;
  /** Paginación fija en índice de colección (p. ej. 4 / 4). */
  collectionIndex?: number;
  collectionTotal?: number;
};

const SWIPE_MIN = 48;

function NavButtons({
  onPrev,
  onNext,
  className = '',
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  const btn =
    'inline-flex min-h-[44px] min-w-[44px] items-center justify-center bg-[var(--nav-accent,#9b7b39)] text-white transition-colors hover:bg-[#856832] active:bg-[#705a28]';

  return (
    <div className={`flex shrink-0 ${className}`}>
      <button type="button" onClick={onPrev} aria-label="Anterior" className={btn}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Siguiente"
        className={`${btn} border-l border-white/20`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

const DEFAULT_AUTO_PLAY_MS = 5000;

type SplitStorySliderProps = {
  slides: SplitStorySlide[];
  ariaLabel: string;
  renderTitle?: (slide: SplitStorySlide) => ReactNode;
  /** Sin bordes propios; va dentro de una sección padre (p. ej. Colecciones). */
  embedded?: boolean;
  /** Avance automático entre diapositivas. */
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export function SplitStorySlider({
  slides,
  ariaLabel,
  renderTitle,
  embedded = false,
  autoPlay = false,
  autoPlayInterval = DEFAULT_AUTO_PLAY_MS,
}: SplitStorySliderProps) {
  const [slideActual, setSlideActual] = useState(0);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = slides.length;

  const siguiente = useCallback(() => {
    setSlideActual((prev) => (total <= 1 ? prev : prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const anterior = useCallback(() => {
    setSlideActual((prev) => (total <= 1 ? prev : prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1 || autoPlayPaused) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const id = window.setInterval(siguiente, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, total, autoPlayPaused, siguiente]);

  if (total === 0) return null;

  const slide = slides[slideActual] ?? slides[0];
  if (!slide) return null;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0]?.clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta == null || Math.abs(delta) < SWIPE_MIN) return;
    if (delta < 0) siguiente();
    else anterior();
  };

  const Wrapper = embedded ? 'div' : 'section';
  const wrapperClass = embedded
    ? 'font-sans'
    : 'museum-band border-y border-border/80';

  return (
    <Wrapper className={wrapperClass} aria-label={embedded ? undefined : ariaLabel}>
      <div
        className="relative mx-auto w-full max-w-7xl overflow-hidden font-sans"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setAutoPlayPaused(true)}
        onMouseLeave={() => setAutoPlayPaused(false)}
        onFocusCapture={() => setAutoPlayPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setAutoPlayPaused(false);
          }
        }}
      >
        <div className="relative hidden lg:block lg:h-[600px]">
          <div className="absolute inset-y-0 left-0 w-[35%] bg-[#2a2b2f]" aria-hidden />
          <div
            className="absolute inset-y-0 right-0 w-[65%] bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${slide.imagen})` }}
            role="img"
            aria-label={slide.titulo}
          />

          <div className="absolute left-16 top-1/2 z-10 w-[55%] max-w-[650px] -translate-y-1/2 bg-[#f4f7f8] p-10 xl:p-16 shadow-2xl transition-all duration-500 ease-in-out">
            <StoryCardContent
              slide={slide}
              slideActual={slideActual}
              total={total}
              size="desktop"
              renderTitle={renderTitle}
            />
          </div>

          {total > 1 ? (
            <NavButtons onPrev={anterior} onNext={siguiente} className="absolute bottom-0 right-16 z-10" />
          ) : null}
        </div>

        <div className="lg:hidden">
          <div className="h-1.5 bg-[#2a2b2f]" aria-hidden />
          <div
            className="relative h-44 bg-cover bg-center transition-all duration-700 ease-in-out sm:h-60 md:h-72"
            style={{ backgroundImage: `url(${slide.imagen})` }}
            role="img"
            aria-label={slide.titulo}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 -mt-6 px-3 pb-4 sm:-mt-8 sm:px-4 md:px-6">
            <div className="bg-[#f4f7f8] p-5 shadow-xl sm:p-7 md:p-9">
              <StoryCardContent
                slide={slide}
                slideActual={slideActual}
                total={total}
                size="mobile"
                renderTitle={renderTitle}
              />
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-gray-200/80 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {slide.collectionIndex ?? slideActual + 1} / {slide.collectionTotal ?? total}
                </p>
                {total > 1 ? <NavButtons onPrev={anterior} onNext={siguiente} /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

function StoryCardContent({
  slide,
  slideActual,
  total,
  size,
  renderTitle,
}: {
  slide: SplitStorySlide;
  slideActual: number;
  total: number;
  size: 'mobile' | 'desktop';
  renderTitle?: (slide: SplitStorySlide) => ReactNode;
}) {
  const isMobile = size === 'mobile';

  const titleNode = renderTitle ? (
    renderTitle(slide)
  ) : (
    <h2
      className={`font-extrabold leading-tight text-gray-900 ${
        isMobile
          ? 'mb-3 text-xl sm:mb-4 sm:text-2xl md:text-3xl'
          : 'mb-6 text-3xl xl:text-5xl'
      }`}
    >
      {slide.titulo}
    </h2>
  );

  return (
    <>
      <div className={isMobile ? 'mb-3 space-y-1 sm:mb-4' : 'mb-4 space-y-1'}>
        <p
          className={`font-bold uppercase tracking-[0.14em] text-[var(--nav-accent,#9b7b39)] sm:tracking-[0.2em] ${
            isMobile ? 'text-[9px] leading-relaxed sm:text-[10px]' : 'text-[11px]'
          }`}
        >
          {slide.meta}
        </p>
        <p
          className={`font-bold uppercase tracking-[0.12em] text-[var(--nav-accent,#9b7b39)] sm:tracking-[0.18em] ${
            isMobile ? 'text-[9px] leading-relaxed sm:text-[10px]' : 'text-[11px]'
          }`}
        >
          {slide.categoria}
        </p>
      </div>

      <div className={`h-[2px] bg-[var(--nav-accent,#9b7b39)] ${isMobile ? 'mb-4 w-10 sm:mb-5' : 'mb-8 w-12'}`} />

      {titleNode}

      <p
        className={`leading-relaxed text-gray-700 ${
          isMobile ? 'text-sm sm:text-base md:text-lg' : 'text-base lg:text-lg'
        }`}
      >
        {slide.extracto}
      </p>

      {slide.href && slide.ctaLabel && (
        <Link
          href={slide.href}
          className={`inline-flex min-h-[44px] items-center border border-[var(--nav-accent,#9b7b39)] px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--nav-accent,#9b7b39)] transition hover:bg-[var(--nav-accent,#9b7b39)] hover:text-white ${
            isMobile ? 'mt-5' : 'mt-8'
          }`}
        >
          {slide.ctaLabel}
        </Link>
      )}

      {!isMobile && (
        <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
          {slide.collectionIndex ?? slideActual + 1} / {slide.collectionTotal ?? total}
        </p>
      )}
    </>
  );
}
