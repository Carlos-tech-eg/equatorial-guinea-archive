'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { ArticleBlock } from '@/lib/parseArticleBody';

export type EditorialNewsArticleLabels = {
  back: string;
  share: string;
  save: string;
  saved: string;
  byline: string;
  published: string;
  caption: string;
  linkCopied: string;
  source?: string;
};

type EditorialNewsArticleProps = {
  backHref: string;
  title: string;
  metaLine?: string;
  imageUrl: string;
  imageAlt?: string;
  blocks: ArticleBlock[];
  source?: string;
  savedId: string;
  savedStorageKey: string;
  labels: EditorialNewsArticleLabels;
};

function readSavedIds(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function EditorialNewsArticle({
  backHref,
  title,
  metaLine,
  imageUrl,
  imageAlt,
  blocks,
  source,
  savedId,
  savedStorageKey,
  labels,
}: EditorialNewsArticleProps) {
  const [saved, setSaved] = useState(false);
  const [shareHint, setShareHint] = useState<string | null>(null);

  useEffect(() => {
    setSaved(readSavedIds(savedStorageKey).includes(savedId));
  }, [savedId, savedStorageKey]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareHint(labels.linkCopied);
    } catch {
      /* usuario canceló */
    }
    setTimeout(() => setShareHint(null), 2500);
  }, [title, labels.linkCopied]);

  const handleSave = useCallback(() => {
    const ids = readSavedIds(savedStorageKey);
    const next = saved ? ids.filter((id) => id !== savedId) : [...ids, savedId];
    localStorage.setItem(savedStorageKey, JSON.stringify(next));
    setSaved(!saved);
  }, [savedId, savedStorageKey, saved]);

  return (
    <article className="politica-article">
      <div className="politica-article__inner">
        <Link href={backHref} className="politica-article__back">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {labels.back}
        </Link>

        <h1 className="politica-article__headline">{title}</h1>

        <div className="politica-article__meta">
          <p className="politica-article__time">{metaLine || labels.published}</p>
          <div className="politica-article__actions">
            {shareHint ? (
              <span className="politica-article__hint" role="status">
                {shareHint}
              </span>
            ) : null}
            <button type="button" className="politica-article__action" onClick={handleShare}>
              <Share2 className="h-4 w-4" aria-hidden />
              {labels.share}
            </button>
            <button
              type="button"
              className={`politica-article__action${saved ? ' politica-article__action--active' : ''}`}
              onClick={handleSave}
              aria-pressed={saved}
            >
              <Bookmark className="h-4 w-4" aria-hidden />
              {saved ? labels.saved : labels.save}
            </button>
          </div>
        </div>

        <p className="politica-article__byline">{labels.byline}</p>

        {imageUrl ? (
          <figure className="politica-article__figure">
            <ImageWithFallback
              src={imageUrl}
              alt={imageAlt || title}
              className="politica-article__img"
              loading="eager"
            />
            {metaLine ? (
              <figcaption className="politica-article__caption">
                {labels.caption}
                {` — ${metaLine}`}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        {blocks.length > 0 ? (
          <div className="politica-article__body">
            {blocks.map((block, index) =>
              block.type === 'h2' ? (
                <h2 key={index} className="politica-article__subhead">
                  {block.text}
                </h2>
              ) : (
                <p key={index}>{block.text}</p>
              ),
            )}
          </div>
        ) : null}

        {source?.trim() ? (
          <p className="politica-article__source">
            {labels.source ? (
              <>
                <span className="politica-article__source-label">{labels.source}: </span>
                {source}
              </>
            ) : (
              source
            )}
          </p>
        ) : null}
      </div>
    </article>
  );
}
