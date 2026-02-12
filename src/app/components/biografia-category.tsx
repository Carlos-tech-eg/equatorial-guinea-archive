'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ArrowLeft } from 'lucide-react';
// import { getItemsByCategory, type BiografiaCategory } from '@/data/biografias';
import { BiografiaCard } from '@/app/components/biografia-card';
import { useBiographies } from '@/hooks/useContent';

type BiografiaCategoryProps = {
  category: string;
};

export function BiografiaCategoryPage({ category }: BiografiaCategoryProps) {
  const { t } = useLocale();
  const { items: allItems, loading } = useBiographies();

  const items = allItems.filter(i => i.category === category);

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
        <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10 relative max-w-[100vw]">
          <Link
            href="/biografias"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            {t('biografias.backToBiografias')}
          </Link>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-foreground break-words">
            {t(`biografias.categories.${category}`)}
          </h2>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-16 lg:py-24 max-w-[100vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => (
            <BiografiaCard key={item.id} item={item} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
