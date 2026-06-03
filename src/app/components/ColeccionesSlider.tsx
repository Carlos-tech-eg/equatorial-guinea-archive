'use client';

import { SplitStorySlider, type SplitStorySlide } from '@/app/components/SplitStorySlider';
import { useLocale } from '@/app/providers';
import { COLECCIONES_SLIDE_CONFIG } from '@/data/coleccionesSlides';

function ColeccionesPageHeader() {
  const { t } = useLocale();

  return (
    <header
      id="memoria-nacional-heading"
      className="max-w-3xl border-b border-[var(--museum-line)]/60 pb-6 lg:pb-8"
    >
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--museum-amber)]">
        {t('biografias.label')}
      </p>
      <h1 className="font-serif text-3xl font-semibold leading-tight text-[#4a3728] sm:text-4xl lg:text-5xl">
        {t('biografias.title')}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#4a3728]/85 sm:text-base lg:max-w-2xl">
        {t('biografias.subtitle')}
      </p>
    </header>
  );
}

export function ColeccionesSlider() {
  const { t } = useLocale();

  const slides: SplitStorySlide[] = COLECCIONES_SLIDE_CONFIG.map((config, index) => ({
    meta: t(config.metaKey).replace('{{n}}', String(index + 1)),
    categoria: t(config.temaKey),
    titulo: t(`biografias.categories.${config.slug}`),
    extracto: t(config.extractoKey),
    imagen: config.imagen,
    href: `/biografias/${config.slug}`,
    ctaLabel: t('biografias.exploreCollection'),
  }));

  return (
    <section
      className="museum-band bg-[#f4f1ea] border-b border-border/80"
      aria-label={t('biografias.label')}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Encabezado + slider: un solo bloque visual */}
        <div className="px-4 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pt-12">
          <ColeccionesPageHeader />
        </div>

        <div className="mt-6 lg:mt-8">
          <SplitStorySlider
            embedded
            slides={slides}
            ariaLabel={t('biografias.label')}
            renderTitle={(slide) => (
              <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-gray-900 xl:text-5xl">
                {slide.titulo}
              </h2>
            )}
          />
        </div>
      </div>
    </section>
  );
}
