'use client';

import { useState, useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useLocale } from '@/app/providers';
import type { Locale } from '@/i18n';
import { ChevronDown, Menu, Moon, Search, Sun, X } from 'lucide-react';
import { MastheadBrandTitle } from '@/app/components/MastheadBrandTitle';
import {
  COLECCIONES_NAV_LINKS,
  MEMORIA_NACIONAL_SECTIONS,
} from '@/data/navSubnavLinks';

const MEMORIA_NACIONAL_LINKS = MEMORIA_NACIONAL_SECTIONS.map(({ href, labelKey }) => ({
  href,
  labelKey,
}));

const MAIN_NAV = [
  { href: '/', labelKey: 'nav.home' as const },
  { href: '/memoria', labelKey: 'nav.memoriaNacional' as const, subLinks: MEMORIA_NACIONAL_LINKS },
  { href: '/biografias', labelKey: 'nav.biografias' as const, subLinks: COLECCIONES_NAV_LINKS },
  { href: '/about', labelKey: 'nav.aboutOverview' as const },
  { href: '/guinea-hoy', labelKey: 'nav.guineaHoy' as const },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href === '/about') {
    return pathname === '/about' || pathname.startsWith('/about/');
  }
  if (href === '/memoria') {
    return pathname === '/memoria' || pathname.startsWith('/memoria/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MastheadDropdownPanel({
  links,
  pathname,
  t,
}: {
  links: readonly { href: string; labelKey: string }[];
  pathname: string;
  t: (key: string) => string;
}) {
  return (
    <div className="absolute left-0 top-full z-50 w-72 bg-[var(--masthead-dropdown-bg,#ebe6dc)] p-6 text-[var(--masthead-dropdown-fg,#4a3728)] shadow-md opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible">
      <div
        className="absolute -top-2 left-6 -z-10 h-4 w-4 rotate-45 bg-[var(--masthead-dropdown-bg,#ebe6dc)]"
        aria-hidden
      />
      <ul className="relative z-10 m-0 flex list-none flex-col gap-5 p-0">
        {links.map((sub) => {
          const subActive = pathname === sub.href || pathname.startsWith(`${sub.href}/`);
          return (
            <li key={sub.href}>
              <Link
                href={sub.href}
                className={`block text-[13px] font-semibold uppercase leading-snug tracking-wide no-underline transition-colors hover:text-[var(--nav-accent,#9b7b39)] ${
                  subActive ? 'text-[var(--nav-accent,#9b7b39)]' : ''
                }`}
              >
                {t(sub.labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
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
    <div className="masthead-lang flex p-0.5" role="group" aria-label="Idioma">
      {(['es', 'fr'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`masthead-lang-btn px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            locale === l ? 'is-active' : ''
          }`}
        >
          {l === 'es' ? 'ES' : 'FR'}
        </button>
      ))}
    </div>
  );
}

function SocialIcon({ label, children }: { label: string; children: ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="masthead-social"
      onClick={(e) => e.preventDefault()}
    >
      {children}
    </a>
  );
}

function MastheadMobileNavItem({
  item,
  pathname,
  t,
  expanded,
  onToggleSub,
}: {
  item: (typeof MAIN_NAV)[number];
  pathname: string;
  t: (key: string) => string;
  expanded: boolean;
  onToggleSub: () => void;
}) {
  const active = isNavActive(pathname, item.href);
  const subLinks = 'subLinks' in item ? item.subLinks : undefined;

  if (!subLinks?.length) {
    return (
      <li>
        <Link
          href={item.href}
          className={`masthead-mobile-link block px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] no-underline ${
            active ? 'is-active' : ''
          }`}
        >
          {t(item.labelKey)}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="flex items-stretch border-b border-[var(--masthead-border,#e5e5e5)]">
        <Link
          href={item.href}
          className={`masthead-mobile-link flex min-h-[48px] flex-1 items-center px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] no-underline ${
            active ? 'is-active' : ''
          }`}
        >
          {t(item.labelKey)}
        </Link>
        <button
          type="button"
          className="masthead-mobile-dropdown-btn inline-flex w-12 shrink-0 items-center justify-center border-l border-[var(--masthead-border,#e5e5e5)] text-[var(--nav-accent,#9b7b39)]"
          aria-expanded={expanded}
          aria-controls={`mobile-sub-${item.href}`}
          aria-label={expanded ? 'Cerrar submenú' : 'Abrir submenú'}
          onClick={onToggleSub}
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </div>
      {expanded ? (
        <ul
          id={`mobile-sub-${item.href}`}
          className="masthead-mobile-sub m-0 list-none border-b border-[var(--masthead-border,#e5e5e5)] p-0"
        >
          {subLinks.map((sub) => (
            <li key={sub.href}>
              <Link
                href={sub.href}
                className={`masthead-mobile-sub-link block py-2.5 pl-8 pr-5 text-[10px] font-medium uppercase tracking-[0.16em] no-underline ${
                  pathname === sub.href || pathname.startsWith(`${sub.href}/`)
                    ? 'is-active'
                    : ''
                }`}
              >
                {t(sub.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function TickerMasthead() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedHref, setMobileExpandedHref] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpandedHref(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) setMobileExpandedHref(null);
  }, [mobileOpen]);

  const iconBtn = 'masthead-icon-btn inline-flex h-8 w-8 items-center justify-center';

  return (
      <header className="site-masthead sticky top-0 z-50">
        {/* Fila superior: utilidades | marca | redes */}
        <div className="masthead-top">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid min-h-[72px] grid-cols-[auto_1fr_auto] items-center gap-2 py-3 sm:min-h-[80px] sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:py-3.5">
              <div className="flex items-center gap-1 sm:gap-3 sm:justify-self-start">
                <Link href="/memoria/documentos" className={iconBtn} aria-label={t('nav.search')}>
                  <Search className="h-4 w-4 stroke-[1.75]" />
                </Link>
                <button
                  type="button"
                  className={`${iconBtn} sm:hidden`}
                  aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((o) => !o)}
                >
                  {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
              </div>

              <Link href="/" className="no-underline text-center justify-self-center min-w-0 px-2">
                <MastheadBrandTitle
                  line1={t('nav.brand')}
                  line2={t('nav.brandSub')}
                  tagline={t('footer.tagline')}
                />
              </Link>

              <div className="flex items-center justify-end gap-2 sm:gap-3 sm:justify-self-end">
                <div className="hidden items-center gap-3 sm:flex">
                  <SocialIcon label="Instagram">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </SocialIcon>
                </div>
                <LanguageSwitcher locale={locale} setLocale={setLocale} />
                <button
                  type="button"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={iconBtn}
                  aria-label="Toggle theme"
                >
                  {!mounted ? (
                    <span className="block h-4 w-4" />
                  ) : theme === 'dark' ? (
                    <Sun className="h-4 w-4 stroke-[1.75]" />
                  ) : (
                    <Moon className="h-4 w-4 stroke-[1.75]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fila inferior: menú centrado con divisores */}
        <nav
          className="masthead-nav-row hidden md:block"
          aria-label="Principal"
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <ul className="flex list-none items-center justify-center m-0 p-0">
              {MAIN_NAV.map((item, index) => {
                const active = isNavActive(pathname, item.href);
                if ('subLinks' in item && item.subLinks) {
                  return (
                    <li key={item.href} className="flex items-center">
                      {index > 0 && <span className="masthead-nav-divider" aria-hidden />}
                      <div className="group relative inline-block font-sans">
                        <Link
                          href={item.href}
                          className={`masthead-nav-link inline-flex items-center gap-1.5 pb-2.5 ${active ? 'is-active' : ''}`}
                        >
                          {t(item.labelKey)}
                          <span className="text-[10px] text-[var(--nav-accent,#9b7b39)]" aria-hidden>
                            ▼
                          </span>
                        </Link>
                        <MastheadDropdownPanel links={item.subLinks} pathname={pathname} t={t} />
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={item.href} className="flex items-center">
                    {index > 0 && <span className="masthead-nav-divider" aria-hidden />}
                    <Link
                      href={item.href}
                      className={`masthead-nav-link${
                        item.href === '/guinea-hoy' ? ' masthead-nav-outline' : ''
                      } ${active ? 'is-active' : ''}`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Menú móvil */}
        {mobileOpen && (
          <nav
            className="masthead-mobile-nav border-t md:hidden"
            aria-label="Principal móvil"
          >
            <ul className="m-0 list-none p-0">
              {MAIN_NAV.map((item) => (
                <MastheadMobileNavItem
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  t={t}
                  expanded={mobileExpandedHref === item.href}
                  onToggleSub={() =>
                    setMobileExpandedHref((prev) => (prev === item.href ? null : item.href))
                  }
                />
              ))}
            </ul>
          </nav>
        )}
      </header>
  );
}
