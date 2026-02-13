'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useLocale } from '@/app/providers';
import { ChevronRight } from 'lucide-react';

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const CATEGORIES = [
  { key: 'cultura' as const, personIds: ['tradiciones'] },
  { key: 'musica' as const, personIds: ['makossa'] },
  { key: 'personasHistoricas' as const, personIds: ['ntutumu', 'colonial'] },
  { key: 'politica' as const, personIds: ['macias'] },
] as const;

export function BiografiasWidget() {
  const { t } = useLocale();

  return (
    <aside
      className="rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-6 lg:p-8 shadow-sm w-full min-w-0"
      aria-label={t('biografias.label')}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5 sm:mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground">
          {t('biografias.title')}
        </h3>
        <Link
          href="/biografias"
          className="inline-flex items-center gap-1 text-sm font-medium text-accent-gold hover:text-accent-gold-muted transition-colors uppercase tracking-[0.1em]"
        >
          {t('biografias.readMore')}
          <ChevronRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {CATEGORIES.map(({ key, personIds }) => (
          <motion.div key={key} variants={item}>
          <Link
            href={`/biografias/${key}`}
            className="group block rounded-lg border border-border bg-muted/30 hover:bg-muted/50 hover:border-accent-gold/30 hover:shadow-md p-4 transition-all duration-300 no-underline"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-accent-gold font-medium mb-2">
              {t(`biografias.categories.${key}`)}
            </p>
            <p className="text-sm sm:text-base text-foreground font-serif font-light group-hover:text-accent-gold transition-colors line-clamp-2">
              {t(`biografias.persons.${personIds[0]}.name`)}
            </p>
            {personIds.length > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                +{personIds.length - 1}
              </p>
            )}
          </Link>
          </motion.div>
        ))}
      </motion.div>
    </aside>
  );
}
