'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { BiografiaCategory } from '@/data/biografias';
import type { BiografiaItem } from '@/data/biografias';

type BiografiaCardProps = {
  item: BiografiaItem;
  category: BiografiaCategory;
};

export function BiografiaCard({ item, category }: BiografiaCardProps) {
  const { t } = useLocale();

  return (
    <Link
      href={`/biografias/${category}/${item.id}`}
      className="group block no-underline"
    >
      <article className="rounded-xl sm:rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:border-accent-gold/20 transition-all duration-300 w-full min-w-0">
        <div className="relative overflow-hidden aspect-[4/3] bg-muted/30">
          <ImageWithFallback
            src={item.imageUrl}
            alt={t(`biografias.persons.${item.id}.name`)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-4 sm:p-6 space-y-2">
          <div className="flex flex-wrap items-baseline gap-2 text-xs sm:text-sm text-accent-gold font-medium">
            {item.year && <span>{item.year}</span>}
          </div>
          <h4 className="font-serif text-lg sm:text-xl font-light text-foreground group-hover:text-accent-gold transition-colors leading-tight line-clamp-2">
            {t(`biografias.persons.${item.id}.name`)}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {t(`biografias.persons.${item.id}.role`)}
          </p>
        </div>
      </article>
    </Link>
  );
}
