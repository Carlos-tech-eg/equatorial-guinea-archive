'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ArrowLeft } from 'lucide-react';
import { AnimateInView } from '@/app/components/AnimateInView';
import { BiografiaCard } from '@/app/components/biografia-card';
import { EditorialInfoPanel } from '@/app/components/EditorialInfoPanel';
import { PoliticaEditorialGrid } from '@/app/components/PoliticaEditorialGrid';
import { PoliticaMoreNewsRail } from '@/app/components/PoliticaMoreNewsRail';
import {
  buildPoliticaDisplayPhotos,
  getPoliticaRailPhotos,
} from '@/lib/politicaEditorial';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useBiographies, usePhotos } from '@/hooks/useContent';
import {
  BIOGRAFIA_CATEGORIES,
  type BiografiaCategory,
} from '@/data/biografias';
import { BIOGRAFIA_CATEGORY_BACKGROUNDS } from '@/data/biografiaCategoryBackgrounds';

const CONTENT_ID = 'coleccion-contenido';

const PANEL_IMAGES: Partial<Record<BiografiaCategory, string>> = {
  cultura: '/images/archive/tradiciones-baile.png',
};

type BiografiaCategoryProps = {
  category: string;
};

export function BiografiaCategoryPage({ category }: BiografiaCategoryProps) {
  const { t, locale } = useLocale();
  const isPolitica = category === 'politica';
  const { items: allItems, loading: biosLoading } = useBiographies();
  const { photos, loading: photosLoading, error: photosError } = usePhotos(
    isPolitica ? 'politica' : undefined,
  );

  const isKnown = BIOGRAFIA_CATEGORIES.includes(category as BiografiaCategory);
  const cat = category as BiografiaCategory;
  const loading = isPolitica ? photosLoading : biosLoading;

  const politicaDisplayPhotos = isPolitica
    ? buildPoliticaDisplayPhotos(photos, t, locale)
    : [];
  const politicaOverflowPhotos = isPolitica ? getPoliticaRailPhotos(t) : [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ea]">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--nav-accent,#9b7b39)]" />
      </div>
    );
  }

  const items = allItems.filter((i) => i.category === category);
  const title = isKnown ? t(`biografias.categories.${cat}`) : category;
  const tema = isKnown ? t(`biografias.collectionSlides.${cat}.tema`) : '';
  const heroImage = isKnown
    ? BIOGRAFIA_CATEGORY_BACKGROUNDS[cat]
    : '/images/equatorial-guinea-map.png';
  const panelImage = (isKnown && PANEL_IMAGES[cat]) || heroImage;

  return (
    <div className="about-page min-h-screen bg-[#f4f1ea]">
      <div className="border-b border-border/80 bg-[#f4f1ea]">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
          <Link
            href="/biografias"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5c4d3d] transition hover:text-[#2c2419]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t('biografias.backToBiografias')}
          </Link>
        </div>
      </div>

      {isKnown ? (
        <>
          <header className="about-page__hero relative flex min-h-[min(44vh,360px)] items-center justify-center overflow-hidden sm:min-h-[420px] lg:min-h-[480px]">
            <div className="absolute inset-0" aria-hidden>
              <ImageWithFallback
                src={heroImage}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
            </div>
            <div className="relative z-10 mx-auto max-w-3xl px-6 py-14 text-center sm:px-10">
              {tema ? (
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
                  {tema}
                </p>
              ) : null}
              <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
            </div>
          </header>

          <EditorialInfoPanel
            title={title}
            body1={t(`biografias.categoryIntro.${cat}.body1`)}
            pullQuote={t(`biografias.categoryIntro.${cat}.pullQuote`)}
            body2={t(`biografias.categoryIntro.${cat}.body2`)}
            imageSrc={panelImage}
            imageAlt={title}
          />
        </>
      ) : null}

      <div id={CONTENT_ID} className={isKnown ? 'pb-12 pt-4 sm:pb-16 sm:pt-6' : ''}>
        {isPolitica ? (
          <>
            {photosError ? (
              <p className="bg-red-50 px-6 py-4 text-center text-sm text-red-800">
                {photosError}
              </p>
            ) : null}
            <PoliticaEditorialGrid
              photos={politicaDisplayPhotos}
              embedded
              emptyHint={t('gallery.emptyPolitica')}
            />
            <PoliticaMoreNewsRail photos={politicaOverflowPhotos} />
          </>
        ) : (
          <section className="border-t border-border bg-background">
            <div className="container mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
              <AnimateInView>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                  {items.map((item) => (
                    <BiografiaCard key={item.id} item={item} category={category} />
                  ))}
                </div>
              </AnimateInView>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
