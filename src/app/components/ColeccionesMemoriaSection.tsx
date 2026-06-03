'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';
import { BIOGRAFIA_CATEGORY_BACKGROUNDS } from '@/data/biografiaCategoryBackgrounds';
import type { BiografiaCategory } from '@/data/biografias';

const CATEGORY_KEYS: BiografiaCategory[] = [
  'cultura',
  'musica',
  'personasHistoricas',
  'politica',
];

type ColeccionesMemoriaSectionProps = {
  /** En inicio: encabezado + enlace. En Colecciones: solo la cuadrícula (el texto va arriba del slider). */
  variant?: 'home' | 'page';
};

export function ColeccionesMemoriaSection({ variant = 'page' }: ColeccionesMemoriaSectionProps) {
  const { t } = useLocale();
  const isHome = variant === 'home';

  return (
    <section
      className={`museum-band bg-[#f4f1ea] ${isHome ? 'border-t border-border/80' : ''}`}
      aria-labelledby={isHome ? 'memoria-nacional-heading' : undefined}
    >
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        {isHome && (
          <AnimateInView>
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[var(--museum-line)] pb-5 sm:flex-row sm:items-end">
              <div className="min-w-0">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--museum-amber)]">
                  {t('biografias.label')}
                </p>
                <h2
                  id="memoria-nacional-heading"
                  className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl"
                >
                  {t('biografias.title')}
                </h2>
              </div>
              <Link
                href="/biografias"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--museum-amber)] transition hover:text-[var(--museum-amber-soft)]"
              >
                {t('biografias.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateInView>
        )}

        <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${isHome ? '' : 'pt-2'}`}>
          {CATEGORY_KEYS.map((category, index) => (
            <AnimateInView key={category} delay={index * 0.04}>
              <Link
                href={`/biografias/${category}`}
                className="group relative block min-h-[200px] overflow-hidden border border-[var(--museum-line)] transition hover:-translate-y-1 hover:border-[var(--museum-amber)] sm:min-h-[220px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${BIOGRAFIA_CATEGORY_BACKGROUNDS[category]})`,
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35 transition group-hover:from-black/95"
                  aria-hidden
                />
                <div className="relative z-10 flex min-h-[200px] flex-col justify-end p-4 sm:min-h-[220px] sm:p-5">
                  <h3 className="font-serif text-xl font-semibold leading-tight text-white transition group-hover:text-[var(--museum-amber)] sm:text-2xl lg:text-3xl">
                    {t(`biografias.categories.${category}`)}
                  </h3>
                  <div className="mt-4 h-px w-12 bg-[var(--museum-amber)] sm:mt-6" />
                </div>
              </Link>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
