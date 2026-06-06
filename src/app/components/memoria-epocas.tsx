'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { AnimateInView } from '@/app/components/AnimateInView';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { archivoHistorico } from '@/data/archivoHistorico';

export function MemoriaEpocas() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-[#F3EEE6]">
      <header className="border-b border-border/80 bg-[#f4f1ea]">
        <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--museum-amber)]">
            {t('memoria.label')}
          </p>
          <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
            {t('memoria.sections.epocas')}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
            {t('memoria.epocasIntro')}
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        {archivoHistorico.map((epoca, index) => (
          <AnimateInView key={epoca.id} delay={index * 0.06}>
            <article className="grid gap-6 border border-[var(--museum-line)] bg-white p-5 sm:grid-cols-[1fr_1.1fr] sm:gap-8 sm:p-8 lg:grid-cols-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--museum-amber)]">
                  {epoca.fecha}
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a8278]">
                  {epoca.categoria}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {epoca.titulo}
                </h2>
                <p className="mt-4 text-[15px] leading-8 text-[#5c4d3d]">{epoca.extracto}</p>
              </div>
              <div className="overflow-hidden">
                <ImageWithFallback
                  src={epoca.imagen}
                  alt={epoca.titulo}
                  className="aspect-[4/3] w-full object-cover grayscale-[0.15] sepia-[0.1]"
                />
              </div>
            </article>
          </AnimateInView>
        ))}
      </div>

      <div className="border-t border-border/80 bg-[#f4f1ea] py-8">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-10">
          <Link
            href="/memoria/documentos"
            className="inline-flex min-h-[44px] items-center border border-[var(--museum-amber)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--museum-amber)] transition hover:bg-[var(--museum-amber)] hover:text-black"
          >
            {t('memoria.goToDocumentos')}
          </Link>
        </div>
      </div>
    </div>
  );
}
