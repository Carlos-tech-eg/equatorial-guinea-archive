'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';

export function Home() {
  const { t } = useLocale();

  return (
    <div className="min-h-[50vh]">
      {/* Hero with gradient */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28 relative">
          <p className="text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-accent-gold mb-6">
            {t('home.period')}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground mb-8 sm:mb-10 leading-[1.1]">
            {t('home.title')}
          </h2>
          <div className="w-16 sm:w-24 h-0.5 bg-accent-gold/60 rounded-full mb-8 sm:mb-10" />
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light mb-10 sm:mb-14 max-w-2xl">
            {t('home.intro')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-accent-gold text-primary-foreground text-[13px] sm:text-[15px] font-medium uppercase tracking-[0.15em] rounded-lg hover:bg-accent-gold-muted transition-colors shadow-lg shadow-accent-gold/20"
            >
              {t('home.cta')}
              <span className="text-lg sm:text-xl" aria-hidden>→</span>
            </Link>
            <Link
              href="/biografias"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-border text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] rounded-lg hover:bg-accent hover:border-accent-gold/40 transition-all"
            >
              {t('nav.biografias')}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
          <div className="rounded-2xl bg-card border border-border p-8 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                  {t('home.purposeTitle')}
                </h3>
                <div className="w-12 sm:w-16 h-0.5 bg-accent-gold/60 rounded-full" />
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
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
          <div className="rounded-2xl bg-muted/40 border border-border p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-4">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                  {t('home.contextTitle')}
                </h3>
                <div className="w-12 sm:w-16 h-0.5 bg-accent-gold/60 rounded-full" />
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t('home.context')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
