'use client';

import { useLocale } from '@/app/providers';

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-border bg-card mt-16 sm:mt-24 md:mt-32">
      <div className="container mx-auto px-3 sm:px-6 lg:px-10 py-8 sm:py-12 md:py-16 max-w-[100vw]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
          <div className="min-w-0">
            <p className="font-serif text-lg sm:text-xl md:text-2xl font-light text-foreground mb-2 break-words">
              Guinea Equatorial <span className="italic text-accent-gold">Archivos</span>
            </p>
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm text-muted-foreground">
            <a href="/" className="py-2 px-1 min-h-[44px] inline-flex items-center hover:text-foreground transition-colors">{t('nav.home')}</a>
            <a href="/gallery" className="py-2 px-1 min-h-[44px] inline-flex items-center hover:text-foreground transition-colors">{t('nav.gallery')}</a>
            <a href="/biografias" className="py-2 px-1 min-h-[44px] inline-flex items-center hover:text-foreground transition-colors">{t('nav.biografias')}</a>
            <a href="/about" className="py-2 px-1 min-h-[44px] inline-flex items-center hover:text-foreground transition-colors">{t('nav.about')}</a>
            <a href="/admin" className="py-2 px-1 min-h-[44px] inline-flex items-center hover:text-accent-gold transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
