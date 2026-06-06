'use client';

import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const HERO_IMAGE = '/images/house.jpeg';
const STORY_IMAGE = '/images/archive/tradiciones-baile.png';

export function About() {
  const { t } = useLocale();

  return (
    <div className="about-page min-h-screen bg-white">
      <header className="about-page__hero relative flex min-h-[min(52vh,420px)] items-center justify-center overflow-hidden sm:min-h-[480px] lg:min-h-[560px]">
        <div className="absolute inset-0" aria-hidden>
          <ImageWithFallback
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center sm:px-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
            {t('about.label')}
          </p>
          <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('about.heroTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/82 sm:text-base">
            {t('about.heroIntro')}
          </p>
        </div>
      </header>

      <div className="about-page__overlap relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimateInView>
          <section className="about-page__panel -mt-24 bg-white px-6 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:-mt-32 sm:px-10 sm:py-14 lg:-mt-40 lg:px-16 lg:py-16">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
              <div className="min-w-0 space-y-6">
                <h2 className="font-serif text-3xl font-normal leading-tight text-[#1a1a1a] sm:text-4xl">
                  {t('about.institutionTitle')}
                </h2>
                <p className="text-[15px] leading-8 text-[#6b6b6b] sm:text-base">
                  {t('about.mission1')}
                </p>
                <p className="about-page__pull-quote font-serif text-xl font-medium italic leading-snug text-[#1a1a1a] sm:text-2xl lg:text-[1.65rem]">
                  {t('about.pullQuote1')}
                </p>
                <p className="text-[15px] leading-8 text-[#6b6b6b] sm:text-base">
                  {t('about.mission2')}
                </p>
              </div>
              <div className="about-page__figure overflow-hidden lg:pt-2">
                <ImageWithFallback
                  src={STORY_IMAGE}
                  alt={t('about.institutionTitle')}
                  className="aspect-[4/3] w-full object-cover grayscale contrast-[1.05]"
                />
              </div>
            </div>
          </section>
        </AnimateInView>
      </div>
    </div>
  );
}
