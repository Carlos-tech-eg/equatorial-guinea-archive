'use client';

import { useLocale } from '@/app/providers';

const PERSON_IDS = ['macias', 'ntutumu', 'colonial'] as const;

export function Biografias() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen w-full min-w-0">
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-16 lg:py-20 relative max-w-[100vw]">
          <p className="text-xs sm:text-[13px] md:text-[15px] uppercase tracking-[0.2em] text-accent-gold mb-4 sm:mb-6">
            {t('biografias.label')}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground mb-4 sm:mb-8 break-words">
            {t('biografias.title')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl w-full leading-relaxed">
            {t('biografias.subtitle')}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-16 lg:py-24 max-w-[100vw]">
        <div className="grid gap-6 sm:gap-8 lg:gap-12 max-w-4xl w-full min-w-0">
          {PERSON_IDS.map((id) => (
            <article
              key={id}
              className="rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-8 md:p-10 shadow-sm hover:shadow-md hover:border-accent-gold/20 transition-all duration-300 w-full min-w-0"
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
