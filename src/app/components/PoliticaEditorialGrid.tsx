'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import type { Photo } from '@/hooks/useContent';
import {
  getPoliticaEleccionesArticle,
  isPoliticaEleccionesPhoto,
} from '@/data/politicaEleccionesArticle';
import type { Locale } from '@/i18n';

const FALLBACK_IMAGES = [
  '/images/categories/politica.png',
  '/images/independencia-de-guinea.jpeg',
  '/images/archive/desfile-militar.png',
  '/images/house.jpeg',
  '/images/equatorial-guinea-map.png',
];

type Story = {
  image: string;
  title: string;
  summary: string;
  href?: string;
};

function storyFromPhoto(photo: Photo, fallbackTitle: string, fallbackSummary: string): Story {
  return {
    image: photo.imageUrl?.trim() || FALLBACK_IMAGES[0],
    title: photo.title?.trim() || fallbackTitle,
    summary: photo.description?.trim() || fallbackSummary,
    href: `/photo/${photo.id}`,
  };
}

function storyFromI18n(
  image: string,
  titleKey: string,
  summaryKey: string,
  t: (key: string) => string,
): Story {
  return {
    image,
    title: t(titleKey),
    summary: t(summaryKey),
  };
}

function buildPoliticaStories(
  photos: Photo[],
  t: (key: string) => string,
  locale: Locale,
) {
  const p = photos.filter((x) => x.imageUrl?.trim());
  const base = 'biografias.politicaEditorial';
  const eleccionesArticle =
    p[0] && isPoliticaEleccionesPhoto(p[0]) ? getPoliticaEleccionesArticle(locale) : null;

  const featured: Story = p[0]
    ? eleccionesArticle
      ? {
          image: p[0].imageUrl?.trim() || FALLBACK_IMAGES[0],
          title: eleccionesArticle.coverTitle,
          summary: eleccionesArticle.coverSummary,
          href: `/photo/${p[0].id}`,
        }
      : {
          ...storyFromPhoto(p[0], t(`${base}.featuredTitle`), t(`${base}.featuredSummary`)),
          title: p[0].title?.trim() || t(`${base}.featuredTitle`),
          summary: p[0].description?.trim() || t(`${base}.featuredSummary`),
        }
    : storyFromI18n(FALLBACK_IMAGES[0], `${base}.featuredTitle`, `${base}.featuredSummary`, t);

  const left: [Story, Story] = [
    p[1]
      ? storyFromPhoto(p[1], t(`${base}.left1.title`), t(`${base}.left1.summary`))
      : storyFromI18n(FALLBACK_IMAGES[1], `${base}.left1.title`, `${base}.left1.summary`, t),
    p[2]
      ? storyFromPhoto(p[2], t(`${base}.left2.title`), t(`${base}.left2.summary`))
      : storyFromI18n(FALLBACK_IMAGES[2], `${base}.left2.title`, `${base}.left2.summary`, t),
  ];

  const right: [Story, Story] = [
    p[3]
      ? storyFromPhoto(p[3], t(`${base}.right1.title`), t(`${base}.right1.summary`))
      : storyFromI18n(FALLBACK_IMAGES[3], `${base}.right1.title`, `${base}.right1.summary`, t),
    p[4]
      ? storyFromPhoto(p[4], t(`${base}.right2.title`), t(`${base}.right2.summary`))
      : storyFromI18n(FALLBACK_IMAGES[4], `${base}.right2.title`, `${base}.right2.summary`, t),
  ];

  return { featured, left, right, featuredIsElecciones: Boolean(eleccionesArticle) };
}

function SideStory({ story, showDivider }: { story: Story; showDivider?: boolean }) {
  const inner = (
    <>
      <div className="politica-editorial__media">
        <ImageWithFallback src={story.image} alt="" className="politica-editorial__img" />
      </div>
      <h3 className="politica-editorial__headline">{story.title}</h3>
      {story.summary ? <p className="politica-editorial__summary">{story.summary}</p> : null}
    </>
  );

  const className = `politica-editorial__story${showDivider ? ' politica-editorial__story--divider' : ''}`;

  if (story.href) {
    return (
      <article className={className}>
        <Link href={story.href} className="politica-editorial__story-link">
          {inner}
        </Link>
      </article>
    );
  }

  return <article className={className}>{inner}</article>;
}

type PoliticaEditorialGridProps = {
  photos: Photo[];
  sectionTitle?: string;
  sectionLabel?: string;
  embedded?: boolean;
  emptyHint?: string;
};

export function PoliticaEditorialGrid({
  photos,
  sectionTitle,
  sectionLabel,
  embedded = false,
  emptyHint,
}: PoliticaEditorialGridProps) {
  const { t, locale } = useLocale();
  const { featured, left, right, featuredIsElecciones } = buildPoliticaStories(photos, t, locale);

  if (embedded && photos.length === 0) {
    return (
      <section className="politica-editorial politica-editorial--embedded">
        <p className="mx-auto max-w-xl px-6 py-16 text-center text-sm leading-relaxed text-[#5c4d3d]">
          {emptyHint ?? t('gallery.empty')}
        </p>
      </section>
    );
  }

  const featuredInner = featuredIsElecciones ? (
    <>
      <h2 className="politica-editorial__featured-title politica-editorial__featured-title--lead">
        {featured.title}
      </h2>
      {featured.summary ? (
        <p className="politica-editorial__featured-summary">{featured.summary}</p>
      ) : null}
      <div className="politica-editorial__featured-media">
        <ImageWithFallback src={featured.image} alt="" className="politica-editorial__img" />
      </div>
    </>
  ) : (
    <>
      <div className="politica-editorial__featured-media">
        <ImageWithFallback src={featured.image} alt="" className="politica-editorial__img" />
      </div>
      <h2 className="politica-editorial__featured-title">{featured.title}</h2>
      {featured.summary ? (
        <p className="politica-editorial__featured-summary">{featured.summary}</p>
      ) : null}
    </>
  );

  return (
    <section
      className={`politica-editorial${embedded ? ' politica-editorial--embedded' : ''}`}
      aria-labelledby={embedded ? undefined : 'politica-editorial-heading'}
    >
      <div className="politica-editorial__inner container mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        {!embedded && sectionTitle ? (
          <header className="politica-editorial__page-header">
            {sectionLabel ? (
              <p className="politica-editorial__label">{sectionLabel}</p>
            ) : null}
            <h1 id="politica-editorial-heading" className="politica-editorial__page-title">
              {sectionTitle}
            </h1>
          </header>
        ) : null}

        <div className="politica-editorial__grid">
          <div className="politica-editorial__col politica-editorial__col--side">
            <SideStory story={left[0]} />
            <SideStory story={left[1]} />
          </div>

          <article className="politica-editorial__col politica-editorial__col--center">
            {featured.href ? (
              <Link href={featured.href} className="politica-editorial__featured-link">
                {featuredInner}
              </Link>
            ) : (
              featuredInner
            )}
          </article>

          <div className="politica-editorial__col politica-editorial__col--side">
            <SideStory story={right[0]} />
            <SideStory story={right[1]} showDivider />
          </div>
        </div>
      </div>
    </section>
  );
}
