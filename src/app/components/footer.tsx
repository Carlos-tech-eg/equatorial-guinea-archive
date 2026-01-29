'use client';

import { useLocale } from '@/app/providers';

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-border bg-card mt-24 md:mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 text-center">
        <p className="font-serif text-xl md:text-2xl font-light text-foreground mb-2">
          Guinea Equatorial <span className="italic">Archivos</span>
        </p>
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {t('footer.tagline')}
        </p>
      </div>
    </footer>
  );
}
