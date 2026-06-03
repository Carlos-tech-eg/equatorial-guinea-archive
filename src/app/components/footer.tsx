'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useLocale } from '@/app/providers';
import { ArrowUpRight, Landmark } from 'lucide-react';

export function Footer() {
  const { t } = useLocale();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="border-t border-[var(--museum-line)] bg-[var(--museum-panel)]"
    >
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="min-w-0">
            <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--museum-amber)]">
              <Landmark className="h-4 w-4" />
              Archivo digital
            </p>
            <p className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Guinea Equatorial <span className="italic text-[var(--museum-amber)]">Archivos</span>
            </p>
            <p className="mt-3 max-w-xl text-sm uppercase tracking-[0.18em] text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-3">
            {[
              ['/', t('nav.home')],
              ['/gallery', t('nav.gallery')],
              ['/biografias', t('nav.biografias')],
              ['/about', t('nav.about')],
              ['/guinea-hoy', 'Guinea Hoy'],
              ['/admin', 'Admin'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-[44px] items-center justify-between border border-[var(--museum-line)] px-3 py-2 transition hover:border-[var(--museum-amber)] hover:text-foreground"
              >
                {label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
