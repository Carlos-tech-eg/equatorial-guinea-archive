'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays, Landmark, MapPin } from 'lucide-react';
import { usePhotos } from '@/hooks/useContent';
import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { HERO_FALLBACK_IMAGES } from '@/data/heroFallbackImages';
import { ColeccionesPageContent } from '@/app/components/ColeccionesPageContent';
import { GalleryPageContent } from '@/app/components/GalleryPageContent';

const HERO_SECTION_IMAGE = '/images/independencia-de-guinea.jpeg';

type HeroPhoto = {
  id: string;
  title?: string | null;
  imageUrl: string | null;
  year: string | null;
  location: string | null;
  description?: string | null;
};

function getFallback(index: number) {
  return HERO_FALLBACK_IMAGES[index % HERO_FALLBACK_IMAGES.length];
}

function photoSrc(photo: HeroPhoto | null, index: number) {
  return photo?.imageUrl?.trim() || getFallback(index).src;
}

export function Home() {
  const { t } = useLocale();
  const { photos } = usePhotos();
  const heroPhotos = (photos.length ? photos : []).slice(0, 5) as HeroPhoto[];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[min(100dvh,820px)] overflow-hidden border-b border-border sm:min-h-[calc(100vh-118px)]">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={HERO_SECTION_IMAGE}
            fallbackSrc={photoSrc(heroPhotos[0] ?? null, 0)}
            alt="Ceremonia de independencia de Guinea Ecuatorial"
            className="h-full w-full object-cover grayscale-[0.22] sepia-[0.28]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.55)_0%,rgba(8,8,7,0.88)_45%,rgba(8,8,7,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,8,7,0.92)_0%,rgba(8,8,7,0.68)_48%,rgba(8,8,7,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(214,164,83,0.18),transparent_32%)]" />
        </div>

        <div className="container relative mx-auto flex min-h-[min(100dvh,820px)] max-w-7xl flex-col justify-end px-4 py-10 sm:min-h-[calc(100vh-118px)] sm:justify-center sm:px-6 sm:py-16 lg:px-10">
          <AnimateInView>
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 border-y border-[var(--museum-amber)]/50 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--museum-amber)] sm:mb-5 sm:gap-3 sm:text-[11px] sm:tracking-[0.24em]">
                <Landmark className="h-4 w-4 shrink-0" />
                {t('home.period')}
              </p>
              <h1 className="font-serif text-3xl font-semibold leading-[1.02] text-white sm:text-5xl sm:leading-[0.98] lg:text-7xl">
                {t('home.title')}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
                {t('home.intro')}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Link
                  href="/memoria"
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[var(--museum-amber)] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-black transition hover:bg-[var(--museum-amber-soft)] sm:w-auto"
                >
                  {t('nav.memoriaNacional')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/biografias"
                  className="inline-flex min-h-[44px] w-full items-center justify-center border border-white/35 px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:border-[var(--museum-amber)] hover:text-[var(--museum-amber)] sm:w-auto"
                >
                  {t('nav.biografias')}
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 border border-white/15 bg-black/40 p-4 backdrop-blur sm:gap-4 sm:p-5 md:hidden">
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--museum-amber)] sm:text-[10px]">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                    Periodo
                  </p>
                  <p className="mt-1.5 font-serif text-lg text-white sm:text-xl">1778-1968</p>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--museum-amber)] sm:text-[10px]">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    Archivo
                  </p>
                  <p className="mt-1.5 font-serif text-lg text-white sm:text-xl">Bioko / Rio Muni</p>
                </div>
              </div>
            </div>
          </AnimateInView>

          <div className="absolute bottom-0 right-0 hidden w-[min(38vw,520px)] border-l border-t border-white/20 bg-black/45 p-5 backdrop-blur md:block">
            <div className="grid grid-cols-2 gap-4 text-white/80">
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--museum-amber)]">
                  <CalendarDays className="h-4 w-4" />
                  Periodo
                </p>
                <p className="mt-2 font-serif text-2xl text-white">1778-1968</p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--museum-amber)]">
                  <MapPin className="h-4 w-4" />
                  Archivo
                </p>
                <p className="mt-2 font-serif text-2xl text-white">Bioko / Rio Muni</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryPageContent photos={photos} showTitle={false} maxItems={5} homeWallLayout />

      <ColeccionesPageContent />

    </div>
  );
}
