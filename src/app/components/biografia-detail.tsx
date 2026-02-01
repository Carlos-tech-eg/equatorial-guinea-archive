'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { getBiografiaItem, getItemsByCategory, type BiografiaCategory } from '@/data/biografias';

type BiografiaDetailProps = {
  category: BiografiaCategory;
  id: string;
};

export function BiografiaDetail({ category, id }: BiografiaDetailProps) {
  const { t } = useLocale();
  const item = getBiografiaItem(category, id);
  const categoryItems = getItemsByCategory(category);
  const index = categoryItems.findIndex((i) => i.id === id);
  const prevItem = index > 0 ? categoryItems[index - 1] : null;
  const nextItem = index >= 0 && index < categoryItems.length - 1 ? categoryItems[index + 1] : null;

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

  const name = t(`biografias.persons.${item.id}.name`);
  const role = t(`biografias.persons.${item.id}.role`);
  const bio = t(`biografias.persons.${item.id}.bio`);
  const dates = t(`biografias.persons.${item.id}.dates`);

  return (
    <div className="min-h-screen w-full min-w-0">
      <header className="border-b border-border">
        <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 max-w-[100vw]">
          <Link
            href={`/biografias/${category}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            {t('biografias.backToCategory')} · {t(`biografias.categories.${category}`)}
          </Link>
        </div>
      </header>

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

            <div className="pt-4">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
                {bio}
              </p>
            </div>

            {item.works && item.works.length > 0 && (
              <div className="pt-6 sm:pt-8 border-t border-border">
                <h2 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-2">
                  {t('biografias.obrasTitle')}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {t('biografias.obrasSubtitle')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {item.works.map((work) => (
                    <article
                      key={work.id}
                      className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:border-accent-gold/30 transition-colors"
                    >
                      <div className="aspect-[4/3] bg-muted/30">
                        <ImageWithFallback
                          src={work.imageUrl}
                          alt={t(`biografias.persons.${item.id}.works.${work.id}.title`)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        {work.year && (
                          <p className="text-xs text-accent-gold font-medium mb-1">{work.year}</p>
                        )}
                        <h3 className="font-serif text-lg font-light text-foreground mb-2">
                          {t(`biografias.persons.${item.id}.works.${work.id}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`biografias.persons.${item.id}.works.${work.id}.description`)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
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
                    {t(`biografias.persons.${prevItem.id}.name`)}
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
                    {t(`biografias.persons.${nextItem.id}.name`)}
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
