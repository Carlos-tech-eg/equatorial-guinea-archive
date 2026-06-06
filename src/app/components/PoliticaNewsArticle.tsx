'use client';

import { useLocale } from '@/app/providers';
import { EditorialNewsArticle } from '@/app/components/EditorialNewsArticle';
import {
  getPoliticaEleccionesArticle,
  isPoliticaEleccionesPhoto,
} from '@/data/politicaEleccionesArticle';
import type { Photo } from '@/hooks/useContent';

const SAVED_KEY = 'archivo-saved-politica';

type PoliticaNewsArticleProps = {
  photo: Photo;
};

export function PoliticaNewsArticle({ photo }: PoliticaNewsArticleProps) {
  const { t, locale } = useLocale();

  const elecciones = isPoliticaEleccionesPhoto(photo)
    ? getPoliticaEleccionesArticle(locale)
    : null;

  const title = elecciones?.title || photo.title?.trim() || t('gallery.untitled');
  const metaLine = elecciones?.meta || [photo.year?.trim(), photo.location?.trim()].filter(Boolean).join(' · ');
  const description = photo.description?.trim() || '';

  const blocks = elecciones
    ? elecciones.blocks
    : description
      ? [{ type: 'p' as const, text: description }]
      : [];

  return (
    <EditorialNewsArticle
      backHref="/biografias/politica"
      title={title}
      metaLine={metaLine}
      imageUrl={photo.imageUrl ?? ''}
      imageAlt={title}
      blocks={blocks}
      source={photo.source?.trim() || undefined}
      savedId={photo.id}
      savedStorageKey={SAVED_KEY}
      labels={{
        back: t('photo.politicaArticle.back'),
        share: t('photo.politicaArticle.share'),
        save: t('photo.politicaArticle.save'),
        saved: t('photo.politicaArticle.saved'),
        byline: t('photo.politicaArticle.byline'),
        published: t('photo.politicaArticle.published'),
        caption: t('photo.politicaArticle.caption'),
        linkCopied: t('photo.politicaArticle.linkCopied'),
        source: t('photo.source'),
      }}
    />
  );
}
