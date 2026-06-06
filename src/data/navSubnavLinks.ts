import { BIOGRAFIA_CATEGORIES } from '@/data/biografias';

/** Enlaces del dropdown Memoria Nacional → barra horizontal en /memoria */
export { MEMORIA_NACIONAL_SECTIONS } from '@/data/memoriaNacionalSections';

export const COLECCIONES_NAV_LINKS = BIOGRAFIA_CATEGORIES.map((slug) => ({
  slug,
  href: `/biografias/${slug}`,
  labelKey: `biografias.categories.${slug}` as const,
}));

export const ACERCA_NAV_LINKS = [
  { slug: 'about', href: '/about', labelKey: 'nav.aboutOverview' as const, exact: true },
] as const;
