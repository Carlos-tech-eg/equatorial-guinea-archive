'use client';

import { useLocale } from '@/app/providers';

export function About() {
  const { t, aboutArchives } = useLocale();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20">
          <p className="text-[13px] sm:text-[15px] uppercase tracking-[0.2em] text-muted-foreground mb-4 sm:mb-6">
            {t('about.label')}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-foreground">
            {t('about.title')}
          </h2>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-24">
        <div className="max-w-4xl lg:max-w-5xl space-y-16 sm:space-y-20 lg:space-y-24">
          <section className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                {t('about.missionTitle')}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {t('about.mission1')}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {t('about.mission2')}
              </p>
            </div>
          </section>

          <div className="h-px bg-border" />

          <section className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                {t('about.sourcesTitle')}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              <div>
                <h4 className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-4 sm:mb-5">
                  {t('about.primaryArchives')}
                </h4>
                <ul className="space-y-3 list-none m-0 p-0">
                  {aboutArchives.map((name, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-muted-foreground/60 mt-2 flex-shrink-0">—</span>
                      <span className="text-base sm:text-lg text-muted-foreground font-light">
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-4 sm:mb-5">
                  {t('about.methodologyTitle')}
                </h4>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                  {t('about.methodology')}
                </p>
              </div>
              <div>
                <h4 className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-4 sm:mb-5">
                  {t('about.educationTitle')}
                </h4>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                  {t('about.education')}
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-border" />

          <section className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                {t('about.readingTitle')}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              <div className="pl-6 sm:pl-8 border-l-2 border-border">
                <p className="text-foreground mb-1.5 font-medium">Sundiata, I. K. (1990)</p>
                <p className="text-muted-foreground italic leading-relaxed">
                  Equatorial Guinea: Colonialism, State Terror, and the Search for Stability.
                </p>
                <p className="text-sm text-muted-foreground/80 mt-2">Boulder: Westview Press</p>
              </div>
              <div className="pl-6 sm:pl-8 border-l-2 border-border">
                <p className="text-foreground mb-1.5 font-medium">Nerín, G. (1998)</p>
                <p className="text-muted-foreground italic leading-relaxed">
                  Guinea Ecuatorial, historia en blanco y negro: Hombres blancos y mujeres negras
                  en Guinea Ecuatorial (1843-1968).
                </p>
                <p className="text-sm text-muted-foreground/80 mt-2">
                  Barcelona: Ediciones Península
                </p>
              </div>
              <div className="pl-6 sm:pl-8 border-l-2 border-border">
                <p className="text-foreground mb-1.5 font-medium">Liniger-Goumaz, M. (2000)</p>
                <p className="text-muted-foreground italic leading-relaxed">
                  Historical Dictionary of Equatorial Guinea.
                </p>
                <p className="text-sm text-muted-foreground/80 mt-2">Lanham: Scarecrow Press</p>
              </div>
            </div>
          </section>

          <div className="h-px bg-border" />

          <section className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-4">
                {t('about.contactTitle')}
              </h3>
              <div className="w-12 sm:w-16 h-px bg-border" />
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {t('about.contactText')}
              </p>
              <div className="pt-4 sm:pt-6">
                <p className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {t('about.email')}
                </p>
                <a
                  href={`mailto:${t('about.emailValue')}`}
                  className="text-lg sm:text-xl font-light text-foreground hover:text-muted-foreground transition-colors"
                >
                  {t('about.emailValue')}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
