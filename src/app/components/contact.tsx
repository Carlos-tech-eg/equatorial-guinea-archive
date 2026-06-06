'use client';

import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';

export function Contact() {
  const { t } = useLocale();

  return (
    <div className="about-page min-h-screen bg-white">
      <header className="about-page__hero relative flex min-h-[min(40vh,360px)] items-center justify-center overflow-hidden sm:min-h-[400px]">
        <div className="absolute inset-0 bg-[#2a2b2f]" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-14 text-center sm:px-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
            {t('nav.about')}
          </p>
          <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('nav.contact')}
          </h1>
        </div>
      </header>

      <div className="about-page__overlap relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimateInView>
          <section className="about-page__panel -mt-20 bg-white px-6 py-10 shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:-mt-24 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <h2 className="font-serif text-2xl font-normal text-[#1a1a1a] sm:text-3xl">
              {t('about.contactTitle')}
            </h2>
            <p className="mt-6 text-[15px] leading-8 text-[#6b6b6b] sm:text-base">
              {t('about.contactText')}
            </p>
            <div className="mt-10 border-t border-[#e8e4dc] pt-8">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9a9488]">
                {t('about.email')}
              </p>
              <a
                href={`mailto:${t('about.emailValue')}`}
                className="font-serif text-2xl text-[#1a1a1a] transition hover:text-[var(--museum-amber,#9b7b39)] sm:text-3xl"
              >
                {t('about.emailValue')}
              </a>
            </div>
          </section>
        </AnimateInView>
      </div>
    </div>
  );
}
