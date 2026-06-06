'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';
import { BIOGRAFIA_CATEGORY_BACKGROUNDS } from '@/data/biografiaCategoryBackgrounds';
import { BIOGRAFIA_CATEGORIES } from '@/data/biografias';

export function ColeccionesMemoriaSection() {
  const { t } = useLocale();

  return (
    <section className="museum-band bg-[#f4f1ea]">
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:pb-16">
        <div className="grid gap-4 pt-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {BIOGRAFIA_CATEGORIES.map((category, index) => (
            <AnimateInView key={category} delay={index * 0.04}>
              <Link
                href={`/biografias/${category}`}
                className="group relative block min-h-[200px] overflow-hidden border border-border transition hover:-translate-y-1 hover:border-[var(--museum-amber)] sm:min-h-[220px]"
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
