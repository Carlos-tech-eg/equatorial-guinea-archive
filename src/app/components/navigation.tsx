'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useLocale } from '@/app/providers';
import type { Locale } from '@/i18n';
import { Moon, Sun } from 'lucide-react';

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useLocale();

  const isActive = (path: string) => pathname === path;


  const navLinkClass = (path: string) =>
    `no-underline text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-all px-3 py-2 rounded-lg ${isActive(path)
      ? 'text-accent-gold bg-accent'
      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-3 sm:px-6 lg:px-10 max-w-[100vw]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 py-3 sm:py-5 lg:py-6">
          <Link href="/" className="no-underline flex-shrink-0 group min-w-0">
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-foreground group-hover:text-accent-gold transition-colors break-words">
              {t('nav.brand')}
              <span className="block mt-0.5 text-lg sm:text-xl md:text-2xl italic text-muted-foreground group-hover:text-foreground transition-colors">
                {t('nav.brandSub')}
              </span>
            </h1>
          </Link>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 md:gap-8 min-w-0">
            <ul className="flex flex-wrap gap-1 sm:gap-2 list-none m-0 p-0">
              <li>
                <Link href="/" className={`${navLinkClass('/')} min-h-[44px] min-w-[44px] inline-flex items-center justify-center`}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={`${navLinkClass('/gallery')} min-h-[44px] min-w-[44px] inline-flex items-center justify-center`}>
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link href="/biografias" className={`${navLinkClass('/biografias')} min-h-[44px] min-w-[44px] inline-flex items-center justify-center`}>
                  {t('nav.biografias')}
                </Link>
              </li>
              <li>
                <Link href="/about" className={`${navLinkClass('/about')} min-h-[44px] min-w-[44px] inline-flex items-center justify-center`}>
                  {t('nav.about')}
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-1 border-t border-border pt-3 sm:pt-0 sm:border-t-0 sm:border-l sm:border-border sm:pl-6 md:pl-8">
              <LanguageSwitcher locale={locale} setLocale={setLocale} />
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <div className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                ) : theme === 'dark' ? (
                  <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LanguageSwitcher({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div className="flex rounded-md bg-muted/80 p-0.5" role="group" aria-label="Idioma">
      {(['es', 'fr'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`px-2.5 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider transition-colors rounded ${locale === l
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          {l === 'es' ? 'ES' : 'FR'}
        </button>
      ))}
    </div>
  );
}
