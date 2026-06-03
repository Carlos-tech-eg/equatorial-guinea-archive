import { BIOGRAFIA_CATEGORIES, type BiografiaCategory } from '@/data/biografias';
import { BIOGRAFIA_CATEGORY_BACKGROUNDS } from '@/data/biografiaCategoryBackgrounds';

export const COLECCIONES_CATEGORY_ORDER: BiografiaCategory[] = [...BIOGRAFIA_CATEGORIES];

export type ColeccionSlideConfig = {
  slug: BiografiaCategory;
  metaKey: string;
  temaKey: string;
  extractoKey: string;
  imagen: string;
};

export const COLECCIONES_SLIDE_CONFIG: ColeccionSlideConfig[] = COLECCIONES_CATEGORY_ORDER.map(
  (slug, index) => ({
    slug,
    metaKey: `biografias.collectionSlides.${slug}.meta`,
    temaKey: `biografias.collectionSlides.${slug}.tema`,
    extractoKey: `biografias.collectionSlides.${slug}.extracto`,
    imagen: BIOGRAFIA_CATEGORY_BACKGROUNDS[slug],
  }),
);

export function buildCollectionSlide(
  slug: BiografiaCategory,
  t: (key: string) => string,
  options?: { ctaHref?: string },
) {
  const index = COLECCIONES_SLIDE_CONFIG.findIndex((c) => c.slug === slug);
  const config = COLECCIONES_SLIDE_CONFIG[index];
  if (!config) return null;

  return {
    meta: t(config.metaKey).replace('{{n}}', String(index + 1)),
    categoria: t(config.temaKey),
    titulo: t(`biografias.categories.${slug}`),
    extracto: t(config.extractoKey),
    imagen: config.imagen,
    href: options?.ctaHref ?? `/biografias/${slug}`,
    ctaLabel: t('biografias.exploreCollection'),
    collectionIndex: index + 1,
    collectionTotal: COLECCIONES_SLIDE_CONFIG.length,
  };
}
