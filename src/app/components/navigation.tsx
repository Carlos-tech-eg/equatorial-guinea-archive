'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useLocale } from '@/app/providers';
import type { Locale } from '@/i18n';
import { Moon, Sun } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useLocale();

  const isActive = (path: string) => pathname === path;
  const isDark = theme === 'dark';

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 sm:py-5 lg:py-6">
          <Link href="/" className="no-underline flex-shrink-0">
            <h1 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-foreground">
              {t('nav.brand')}
              <span className="block mt-0.5 text-xl sm:text-2xl italic text-muted-foreground">
                {t('nav.brandSub')}
              </span>
            </h1>
          </Link>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <ul className="flex gap-6 sm:gap-8 list-none m-0 p-0">
              <li>
                <Link
                  href="/"
                  className={`no-underline text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors ${
                    isActive('/')
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className={`no-underline text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors ${
                    isActive('/gallery')
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`no-underline text-[13px] sm:text-[15px] uppercase tracking-[0.15em] transition-colors ${
                    isActive('/about')
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('nav.about')}
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-1 border-l border-border pl-6 sm:pl-8">
              <LanguageSwitcher locale={locale} setLocale={setLocale} />
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
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
          className={`px-2.5 py-1 text-[11px] sm:text-xs font-medium uppercase tracking-wider transition-colors rounded ${
            locale === l
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
