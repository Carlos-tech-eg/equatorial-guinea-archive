'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Landmark } from 'lucide-react';
import { useLocale } from '@/app/providers';

const FOOTER_LINKS = [
  ['/', 'nav.home'],
  ['/memoria', 'nav.memoriaNacional'],
  ['/memoria/documentos', 'memoria.sections.documentos'],
  ['/biografias', 'nav.biografias'],
  ['/about', 'nav.aboutOverview'],
  ['/#contacto', 'nav.contact'],
  ['/guinea-hoy', 'nav.guineaHoy'],
  ['/admin', null],
] as const;

export function Footer() {
  const { t } = useLocale();
  const email = t('about.emailValue');

  return (
    <footer className="archive-footer">
      <section id="contacto" className="archive-footer__contact scroll-mt-24" aria-label={t('footer.contactBandAria')}>
        <div className="archive-footer__contact-inner container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="archive-footer__contact-lead">{t('footer.contactLead')}</p>
          <h2 className="archive-footer__contact-title">
            <Link href={`mailto:${email}`} className="archive-footer__contact-title-link">
              {t('footer.contactTitle')}
            </Link>
          </h2>
          <Link
            href={`mailto:${email}`}
            className="archive-footer__contact-cta"
            aria-label={t('footer.contactTitle')}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </section>

      <div className="archive-footer__main">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-12">
          <div className="archive-footer__layout">
            <div className="archive-footer__brand min-w-0">
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--museum-amber)]">
                <Landmark className="h-4 w-4" aria-hidden />
                {t('footer.brandLabel')}
              </p>
              <p className="archive-footer__slogan">
                {t('footer.sloganBefore')}
                <span className="italic text-[var(--museum-amber)]">{t('footer.sloganAccent')}</span>
                {t('footer.sloganAfter')}
              </p>
              <p className="archive-footer__tagline">{t('footer.tagline')}</p>
            </div>

            <nav className="archive-footer__nav" aria-label={t('footer.navAria')}>
              {FOOTER_LINKS.map(([href, labelKey]) => {
                const label = labelKey ? t(labelKey) : 'Admin';
                return (
                  <Link key={href} href={href} className="archive-footer__nav-link borde-bbc">
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
