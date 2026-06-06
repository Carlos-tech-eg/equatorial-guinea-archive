'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import {
  getPoliticaEleccionesArticle,
  isPoliticaEleccionesPhoto,
} from '@/data/politicaEleccionesArticle';
import type { Photo } from '@/hooks/useContent';

const SAVED_KEY = 'archivo-saved-politica';

type PoliticaNewsArticleProps = {
  photo: Photo;
};

function readSavedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function PoliticaNewsArticle({ photo }: PoliticaNewsArticleProps) {
  const { t, locale } = useLocale();
  const [saved, setSaved] = useState(false);
  const [shareHint, setShareHint] = useState<string | null>(null);

  const elecciones = isPoliticaEleccionesPhoto(photo)
    ? getPoliticaEleccionesArticle(locale)
    : null;

  const title = elecciones?.title || photo.title?.trim() || t('gallery.untitled');
  const metaLine = elecciones?.meta || [photo.year?.trim(), photo.location?.trim()].filter(Boolean).join(' · ');
  const description = photo.description?.trim() || '';

  useEffect(() => {
    setSaved(readSavedIds().includes(photo.id));
  }, [photo.id]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareHint(t('photo.politicaArticle.linkCopied'));
    } catch {
      /* usuario canceló */
    }
    setTimeout(() => setShareHint(null), 2500);
  }, [title, t]);

  const handleSave = useCallback(() => {
    const ids = readSavedIds();
    const next = saved ? ids.filter((id) => id !== photo.id) : [...ids, photo.id];
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    setSaved(!saved);
  }, [photo.id, saved]);

  return (
    <article className="politica-article">
      <div className="politica-article__inner">
        <Link href="/biografias/politica" className="politica-article__back">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t('photo.politicaArticle.back')}
        </Link>

        <h1 className="politica-article__headline">{title}</h1>

        <div className="politica-article__meta">
          <p className="politica-article__time">
            {metaLine || t('photo.politicaArticle.published')}
          </p>
          <div className="politica-article__actions">
            {shareHint ? (
              <span className="politica-article__hint" role="status">
                {shareHint}
              </span>
            ) : null}
            <button type="button" className="politica-article__action" onClick={handleShare}>
              <Share2 className="h-4 w-4" aria-hidden />
              {t('photo.politicaArticle.share')}
            </button>
            <button
              type="button"
              className={`politica-article__action${saved ? ' politica-article__action--active' : ''}`}
              onClick={handleSave}
              aria-pressed={saved}
            >
              <Bookmark className="h-4 w-4" aria-hidden />
              {saved ? t('photo.politicaArticle.saved') : t('photo.politicaArticle.save')}
            </button>
          </div>
        </div>

        <p className="politica-article__byline">{t('photo.politicaArticle.byline')}</p>

        <figure className="politica-article__figure">
          <ImageWithFallback
            src={photo.imageUrl ?? ''}
            alt={title}
            className="politica-article__img"
            loading="eager"
          />
          {metaLine ? (
            <figcaption className="politica-article__caption">
              {t('photo.politicaArticle.caption')}
              {` — ${metaLine}`}
            </figcaption>
          ) : null}
        </figure>

        {elecciones ? (
          <div className="politica-article__body">
            {elecciones.blocks.map((block, index) =>
              block.type === 'h2' ? (
                <h2 key={index} className="politica-article__subhead">
                  {block.text}
                </h2>
              ) : (
                <p key={index}>{block.text}</p>
              ),
            )}
          </div>
        ) : description ? (
          <div className="politica-article__body">
            <p>{description}</p>
          </div>
        ) : null}

        {photo.source?.trim() ? (
          <p className="politica-article__source">
            <span className="politica-article__source-label">{t('photo.source')}: </span>
            {photo.source}
          </p>
        ) : null}
      </div>
    </article>
  );
}
