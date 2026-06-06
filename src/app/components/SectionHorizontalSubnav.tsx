'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '@/app/providers';

export type SectionSubnavItem = {
  href: string;
  labelKey: string;
  slug?: string;
  /** Solo activo en la ruta exacta (no en rutas hijas). */
  exact?: boolean;
};

type SectionHorizontalSubnavProps = {
  items: readonly SectionSubnavItem[];
  ariaLabel: string;
};

function isItemActive(pathname: string, href: string, exact?: boolean): boolean {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SectionHorizontalSubnav({ items, ariaLabel }: SectionHorizontalSubnavProps) {
  const pathname = usePathname();
  const { t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeItem =
    items.find((item) => isItemActive(pathname, item.href, item.exact)) ?? items[0];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="section-horizontal-subnav" aria-label={ariaLabel}>
      <div className="section-horizontal-subnav__mobile md:hidden">
        <button
          type="button"
          className="section-horizontal-subnav__mobile-trigger"
          aria-expanded={mobileOpen}
          aria-controls="section-subnav-mobile-panel"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span>{t(activeItem.labelKey)}</span>
          <ChevronDown
            className={`section-horizontal-subnav__chevron h-4 w-4 shrink-0 ${mobileOpen ? 'is-open' : ''}`}
            aria-hidden
          />
        </button>
        {mobileOpen ? (
          <ul id="section-subnav-mobile-panel" className="section-horizontal-subnav__mobile-panel m-0 list-none p-0">
            {items.map((item) => {
              const active = isItemActive(pathname, item.href, item.exact);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`section-horizontal-subnav__mobile-link${active ? ' is-active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="section-horizontal-subnav__inner container mx-auto hidden max-w-7xl md:flex">
        {items.map((item) => {
          const active = isItemActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`section-horizontal-subnav__link${active ? ' is-active' : ''}`}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
