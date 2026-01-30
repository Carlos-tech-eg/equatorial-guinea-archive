'use client';

import { useLocale } from '@/app/providers';

const PERSON_IDS = ['macias', 'ntutumu', 'colonial'] as const;

export function Biografias() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 relative">
          <p className="text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-accent-gold mb-4 sm:mb-6">
            {t('biografias.label')}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground mb-6 sm:mb-8">
            {t('biografias.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t('biografias.subtitle')}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-24">
        <div className="grid gap-8 sm:gap-10 lg:gap-12 max-w-4xl">
          {PERSON_IDS.map((id) => (
            <article
              key={id}
              className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-accent-gold/20 transition-all duration-300"
            >
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground">
                  {t(`biografias.persons.${id}.name`)}
                </h3>
                <span className="text-sm text-accent-gold font-medium">
                  {t(`biografias.persons.${id}.dates`)}
                </span>
              </div>
              <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4">
                {t(`biografias.persons.${id}.role`)}
              </p>
              <div className="w-12 h-0.5 bg-accent-gold/60 rounded-full mb-6" />
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t(`biografias.persons.${id}.bio`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
