'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { useBiographies } from '@/hooks/useContent';
// import { getBiografiaItem, getItemsByCategory, type BiografiaCategory } from '@/data/biografias';

type BiografiaDetailProps = {
  category: string;
  id: string;
};

export function BiografiaDetail({ category, id }: BiografiaDetailProps) {
  const { t } = useLocale();
  const { items, loading } = useBiographies();

  const item = items.find((i) => i.id === id);
  const categoryItems = items.filter((i) => i.category === category);

  const index = categoryItems.findIndex((i) => i.id === id);
  const prevItem = index > 0 ? categoryItems[index - 1] : null;
  const nextItem = index >= 0 && index < categoryItems.length - 1 ? categoryItems[index + 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-gold"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-12 sm:py-24 text-center max-w-[100vw]">
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-foreground mb-6">
          {t('photo.notFound')}
        </h2>
        <Link
          href="/biografias"
          className="text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors"
        >
          {t('biografias.backToBiografias')}
        </Link>
      </div>
    );
  }

  const name = item.name || item.id;
  const role = item.category;
  const description = item.description ?? '';
  const dates = item.year;

  return (
    <div className="min-h-screen w-full min-w-0">
      <header className="border-b border-border">
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-[100vw]">
          <Link
            href={`/biografias/${category}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            {t('biografias.backToCategory')} · {category}
          </Link>
        </div>
      </header>

      {/* ... Content ... */}
      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16 max-w-[100vw]">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16">
          <div className="lg:col-span-7 min-w-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-xl overflow-hidden bg-card border border-border">
                <div className="aspect-[4/3] bg-muted/30">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={name}
                    className="w-full h-full object-cover max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 sm:space-y-8 min-w-0">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 sm:mb-6 leading-tight break-words">
                {name}
              </h1>
              {dates && (
                <p className="text-sm text-accent-gold font-medium mb-2">{dates}</p>
              )}
              <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4">
                {role}
              </p>
              <div className="w-12 h-0.5 bg-accent-gold/60 rounded-full" />
            </div>

            {description && (
              <div className="pt-4">
                <h2 className="text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Biografía
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                  {description}
                </p>
              </div>
            )}

            {/* Works Section could be complex to map without strict schema, hiding for now if empty */}
            {item.works && item.works.length > 0 && (
              <div className="pt-6 sm:pt-8 border-t border-border">
                {/* ... Render Works ... */}
              </div>
            )}

            <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row gap-6 sm:gap-8">
              {prevItem && (
                <Link
                  href={`/biografias/${category}/${prevItem.id}`}
                  className="group flex-1 min-w-0 no-underline"
                >
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                    ← {t('photo.previous')}
                  </p>
                  <p className="font-serif text-base sm:text-lg text-foreground group-hover:text-accent-gold transition-colors truncate">
                    {prevItem.name || prevItem.id}
                  </p>
                </Link>
              )}
              {nextItem && (
                <Link
                  href={`/biografias/${category}/${nextItem.id}`}
                  className="group flex-1 min-w-0 sm:text-right no-underline"
                >
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                    {t('photo.next')} →
                  </p>
                  <p className="font-serif text-base sm:text-lg text-foreground group-hover:text-accent-gold transition-colors truncate">
                    {nextItem.name || nextItem.id}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
