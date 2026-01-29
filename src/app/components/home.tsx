'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';

export function Home() {
  const { t } = useLocale();

  return (
    <div className="min-h-[50vh]">
      <section className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
          <p className="text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {t('home.period')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground mb-8 sm:mb-10 leading-[1.1]">
            {t('home.title')}
          </h2>
          <div className="w-16 sm:w-24 h-px bg-border mb-8 sm:mb-10" />
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-10 sm:mb-14 max-w-2xl">
            {t('home.intro')}
          </p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-foreground text-background text-[13px] sm:text-[15px] uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
          >
            {t('home.cta')}
            <span className="text-lg sm:text-xl" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                {t('home.purposeTitle')}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('home.purpose1')}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('home.purpose2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                {t('home.contextTitle')}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>
            <div className="lg:col-span-8">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('home.context')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
