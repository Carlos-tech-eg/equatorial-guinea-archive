'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
// import { getItemsByCategory, type BiografiaCategory } from '@/data/biografias';
import { BiografiaCard } from '@/app/components/biografia-card';
import { useBiographies } from '@/hooks/useContent';

const CATEGORY_KEYS: string[] = [
  'cultura',
  'musica',
  'personasHistoricas',
  'politica',
];

export function Biografias() {
  const { t } = useLocale();
  const { items: allItems, loading } = useBiographies();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0">
      <header className="relative overflow-hidden border-b border-border">
        {/* ... header content ... */}
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
        <div className="space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl w-full min-w-0">
          {CATEGORY_KEYS.map((category) => {
            const items = allItems.filter(i => i.category === category);
            if (items.length === 0) return null;
            return (
              <section key={category} className="w-full min-w-0">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6 sm:mb-8">
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-foreground pb-3 border-b border-border text-accent-gold">
                    {t(`biografias.categories.${category}`)}
                  </h3>
                  <Link
                    href={`/biografias/${category}`}
                    className="text-sm font-medium text-accent-gold hover:text-accent-gold-muted uppercase tracking-[0.1em] transition-colors"
                  >
                    {t('biografias.viewAll')}
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {items.map((item) => (
                    <BiografiaCard key={item.id} item={item} category={category} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
