'use client';

import { useLocale } from '@/app/providers';

export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-border bg-card mt-24 md:mt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-center sm:text-left">
          <div>
            <p className="font-serif text-xl md:text-2xl font-light text-foreground mb-2">
              Guinea Equatorial <span className="italic text-accent-gold">Archivos</span>
            </p>
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="flex justify-center sm:justify-end gap-6 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">{t('nav.home')}</a>
            <a href="/gallery" className="hover:text-foreground transition-colors">{t('nav.gallery')}</a>
            <a href="/biografias" className="hover:text-foreground transition-colors">{t('nav.biografias')}</a>
            <a href="/about" className="hover:text-foreground transition-colors">{t('nav.about')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
