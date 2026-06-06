'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { usePhotos } from '@/hooks/useContent';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { ArchivalImageFrame } from '@/app/components/ArchivalImageFrame';
import { PoliticaNewsArticle } from '@/app/components/PoliticaNewsArticle';
import {
  POLITICA_ELECCIONES_ID,
  isPoliticaEleccionesPhoto,
} from '@/data/politicaEleccionesArticle';
import { isPoliticaMockPhotoId } from '@/data/politicaMockNews';
import { resolvePoliticaPhotoById } from '@/lib/politicaEditorial';

type PhotoDetailProps = { id: string };

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export function PhotoDetail({ id }: PhotoDetailProps) {
  const { t, locale } = useLocale();
  const { photos, loading } = usePhotos();

  const photoFromDb = photos.find((p) => p.id === id);
  const isPolitica =
    isPoliticaMockPhotoId(id) ||
    id === POLITICA_ELECCIONES_ID ||
    isPoliticaEleccionesPhoto({ id, title: photoFromDb?.title }) ||
    photoFromDb?.category === 'politica';
  const politicaPhotos = photos.filter((p) => p.category === 'politica');
  const photo = isPolitica
    ? resolvePoliticaPhotoById(id, politicaPhotos, t, locale) ?? photoFromDb
    : photoFromDb;
  const photoIndex = photos.findIndex((p) => p.id === id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent-gold" />
      </div>
    );
  }

  if (!photo) {
    return (
      <div className="container mx-auto max-w-[100vw] px-3 py-12 text-center sm:px-6 sm:py-24 lg:px-10">
        <h2 className="mb-6 font-serif text-3xl font-light text-foreground sm:text-4xl">
          {t('photo.notFound')}
        </h2>
        <Link
          href={isPolitica ? '/biografias/politica' : '/memoria/documentos'}
          className="text-[13px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground sm:text-[15px]"
        >
          {isPolitica ? t('photo.politicaArticle.back') : t('photo.returnToGallery')}
        </Link>
      </div>
    );
  }

  if (isPolitica) {
    return <PoliticaNewsArticle photo={photo} />;
  }

  const title = photo.title ?? '';
  const location = photo.location ?? '';
  const description = photo.description ?? '';
  const source = photo.source ?? '';

  return (
    <div className="min-h-screen w-full min-w-0" style={{ background: 'var(--archival-bg-subtle)' }}>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border"
      >
        <div className="container mx-auto max-w-[100vw] px-3 py-4 sm:px-6 sm:py-6 lg:px-10">
          <Link
            href="/memoria/documentos"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 hover:text-foreground sm:text-[15px]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t('photo.backToGallery')}
          </Link>
        </div>
      </motion.header>

      <motion.div
        className="container mx-auto max-w-[100vw] px-3 py-6 sm:px-6 sm:py-12 lg:px-10 lg:py-16"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <motion.div variants={item} className="min-w-0 lg:col-span-7">
            <div className="space-y-4 sm:space-y-5 lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                {String(photoIndex + 1).padStart(2, '0')} {t('photo.of')}{' '}
                {String(photos.length).padStart(2, '0')}
              </p>
              <ArchivalImageFrame
                src={photo.imageUrl ?? ''}
                alt={title || 'Photo'}
                caption={{ date: photo.year ?? undefined, location: location || undefined }}
                variant="detail"
                interactive={false}
                loading="eager"
                className="max-w-2xl"
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="min-w-0 space-y-6 sm:space-y-10 lg:col-span-5">
            <div>
              <h1 className="mb-4 break-words font-serif text-2xl font-light leading-tight text-foreground sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
                {title}
              </h1>
              <div className="h-px w-12 bg-border sm:w-16" />
            </div>

            <dl className="space-y-6 sm:space-y-8">
              <div>
                <dt className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
                  {t('photo.date')}
                </dt>
                <dd className="text-lg font-light text-foreground sm:text-xl">{photo.year ?? ''}</dd>
              </div>
              <div>
                <dt className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
                  {t('photo.location')}
                </dt>
                <dd className="text-lg font-light text-foreground sm:text-xl">{location}</dd>
              </div>
              <div>
                <dt className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
                  {t('photo.source')}
                </dt>
                <dd className="text-lg font-light text-foreground sm:text-xl">{source}</dd>
              </div>
            </dl>

            <div className="space-y-3 border-t border-border pt-6 sm:space-y-4 sm:pt-8">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
                {t('photo.context')}
              </h2>
              <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            </div>

            {photo.bio && (
              <div className="space-y-3 border-t border-border pt-6 sm:space-y-4 sm:pt-8">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[13px]">
                  Biografía
                </h2>
                <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                  {photo.bio}
                </p>
              </div>
            )}

            <div className="border-t border-border pt-6 sm:pt-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                {photoIndex > 0 && (
                  <Link href={`/photo/${photos[photoIndex - 1].id}`} className="group min-w-0 flex-1">
                    <p className="mb-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">
                      {t('photo.previous')}
                    </p>
                    <p className="truncate font-serif text-base text-foreground transition-colors group-hover:text-muted-foreground sm:text-lg">
                      {photos[photoIndex - 1].title}
                    </p>
                  </Link>
                )}
                {photoIndex < photos.length - 1 && (
                  <Link
                    href={`/photo/${photos[photoIndex + 1].id}`}
                    className="group min-w-0 flex-1 sm:text-right"
                  >
                    <p className="mb-1.5 text-[11px] uppercase tracking-[0.15em] text-muted-foreground sm:text-xs">
                      {t('photo.next')}
                    </p>
                    <p className="truncate font-serif text-base text-foreground transition-colors group-hover:text-muted-foreground sm:text-lg">
                      {photos[photoIndex + 1].title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
