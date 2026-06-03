'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ArrowLeft } from 'lucide-react';
import { BiografiaCard } from '@/app/components/biografia-card';
import { EditorialPhotoGallery } from '@/app/components/EditorialPhotoGallery';
import { SplitStorySlider } from '@/app/components/SplitStorySlider';
import { useBiographies, usePhotos } from '@/hooks/useContent';
import { BIOGRAFIA_CATEGORIES, type BiografiaCategory } from '@/data/biografias';
import { buildCollectionSlide } from '@/data/coleccionesSlides';

const CONTENT_ID = 'coleccion-contenido';

type BiografiaCategoryProps = {
  category: string;
};

export function BiografiaCategoryPage({ category }: BiografiaCategoryProps) {
  const { t } = useLocale();
  const { items: allItems, loading: biosLoading } = useBiographies();
  const { photos, loading: photosLoading } = usePhotos();

  const isKnown = BIOGRAFIA_CATEGORIES.includes(category as BiografiaCategory);
  const cat = category as BiografiaCategory;
  const slide = isKnown ? buildCollectionSlide(cat, t, { ctaHref: `#${CONTENT_ID}` }) : null;
  const isPolitica = category === 'politica';
  const loading = isPolitica ? photosLoading : biosLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f1ea]">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[var(--nav-accent,#9b7b39)]" />
      </div>
    );
  }

  const items = allItems.filter((i) => i.category === category);

  return (
    <div className="min-h-screen w-full min-w-0 bg-[#f4f1ea]">
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

      {slide ? (
        <section className="museum-band border-b border-border/80 bg-[#f4f1ea]" aria-label={slide.titulo}>
          <div className="mx-auto w-full max-w-7xl">
            <SplitStorySlider
              embedded
              slides={[slide]}
              ariaLabel={slide.titulo}
              renderTitle={(s) => (
                <h1 className="mb-6 font-serif text-3xl font-light leading-tight text-gray-900 xl:text-5xl">
                  {s.titulo}
                </h1>
              )}
            />
          </div>
        </section>
      ) : null}

      <div id={CONTENT_ID}>
        {isPolitica ? (
          <EditorialPhotoGallery photos={photos} loading={false} hideIntro embedded />
        ) : (
          <section className="border-t border-border/80 bg-background">
            <div className="container mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                {items.map((item) => (
                  <BiografiaCard key={item.id} item={item} category={category} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
