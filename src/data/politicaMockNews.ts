/** Imagen de la noticia «Elecciones Guinea Ecuatorial». */
export const POLITICA_ELECCIONES_IMAGE = '/images/elecciones-guinea-ecuatorial.png';

/** Retrato de Francisco Macías Nguema (columna editorial izquierda). */
export const POLITICA_MACIAS_IMAGE = '/images/francisco-macias-nguema.png';

/** Militares descubren maletas con dinero en el palacio de Macías, 1979. */
export const POLITICA_MALETAS_MACIAS_IMAGE = '/images/maletas-macias-palacio-1979.png';

/** Golpe de la Libertad, 1979 — desfile militar. */
export const POLITICA_GOLPE_LIBERTAD_IMAGE = '/images/golpe-libertad-1979.png';

/** Acto de independencia en Santa Isabel, 12 de octubre de 1968. */
export const POLITICA_VIETNAM_MACIAS_IMAGE = '/images/macias-vietnam-1970.png';

/** Carril inferior — desfile en Santa Isabel. */
export const POLITICA_RAIL_DESFILE_IMAGE = '/images/politica-rail-desfile-santa-isabel.png';

/** Carril inferior — Macías en acto público. */
export const POLITICA_RAIL_MACIAS_ACTO_IMAGE = '/images/politica-rail-macias-acto-publico.png';

export function isPoliticaMaciasTitle(title: string | undefined | null): boolean {
  if (!title?.trim()) return false;
  return /mac[ií]as/i.test(title) && (/nguema/i.test(title) || /francisco/i.test(title));
}

export function isPoliticaMaletasMaciasTitle(title: string | undefined | null): boolean {
  if (!title?.trim()) return false;
  return (
    /maletas/i.test(title) ||
    (/militares/i.test(title) && /mac[ií]as/i.test(title)) ||
    (/palacio/i.test(title) && /mac[ií]as/i.test(title) && /1979/.test(title))
  );
}

export function isPoliticaGolpeLibertadTitle(title: string | undefined | null): boolean {
  if (!title?.trim()) return false;
  return /golpe/i.test(title) && /libertad/i.test(title) && /1979/.test(title);
}

export function isPoliticaVietnamMaciasTitle(title: string | undefined | null): boolean {
  if (!title?.trim()) return false;
  if (/vietnam/i.test(title) && /mac[ií]as/i.test(title)) return true;
  if (/independencia/i.test(title) && /1968/.test(title) && /santa\s*isabel|malabo|guinea\s*ecuatorial/i.test(title)) {
    return true;
  }
  return false;
}

/** Imágenes locales de archivo para noticias políticas de demostración. */
export const POLITICA_MOCK_IMAGES = [
  POLITICA_ELECCIONES_IMAGE,
  '/images/independencia-de-guinea.jpeg',
  '/images/independencia.jpeg',
  '/images/archive/desfile-militar.png',
  '/images/archive/banda-desfile.png',
  '/images/house.jpeg',
  '/images/obig.jpeg',
  '/images/categories/politica.png',
  '/images/equatorial-guinea-map.png',
  '/images/archive/tradiciones-baile.png',
  '/images/archive/maele-chavely.png',
  '/images/memoria/bio-1.png',
  '/images/memoria/bio-2.png',
  '/images/memoria/bio-3.png',
] as const;

export type PoliticaMockSlot = {
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
  year: string;
  location: string;
};

/** Cinco piezas de la rejilla editorial (claves i18n ya existentes). */
export const POLITICA_GRID_MOCK_SLOTS: PoliticaMockSlot[] = [
  {
    imageUrl: POLITICA_MOCK_IMAGES[0],
    titleKey: 'biografias.politicaEditorial.featuredTitle',
    descriptionKey: 'biografias.politicaEditorial.featuredSummary',
    year: '1968',
    location: 'Malabo',
  },
  {
    imageUrl: POLITICA_MACIAS_IMAGE,
    titleKey: 'biografias.politicaEditorial.left1.title',
    descriptionKey: 'biografias.politicaEditorial.left1.summary',
    year: '1968–1979',
    location: 'Guinea Ecuatorial',
  },
  {
    imageUrl: POLITICA_VIETNAM_MACIAS_IMAGE,
    titleKey: 'biografias.politicaEditorial.left2.title',
    descriptionKey: 'biografias.politicaEditorial.left2.summary',
    year: '1968',
    location: 'Santa Isabel (Malabo)',
  },
  {
    imageUrl: POLITICA_MALETAS_MACIAS_IMAGE,
    titleKey: 'biografias.politicaEditorial.right1.title',
    descriptionKey: 'biografias.politicaEditorial.right1.summary',
    year: '1979',
    location: 'Malabo',
  },
  {
    imageUrl: POLITICA_GOLPE_LIBERTAD_IMAGE,
    titleKey: 'biografias.politicaEditorial.right2.title',
    descriptionKey: 'biografias.politicaEditorial.right2.summary',
    year: '1979',
    location: 'Malabo',
  },
];

/** Ocho noticias adicionales para el carril horizontal. */
export const POLITICA_RAIL_MOCK_SLOTS: PoliticaMockSlot[] = [
  {
    imageUrl: POLITICA_RAIL_DESFILE_IMAGE,
    titleKey: 'biografias.politicaMockNews.rail.0.title',
    descriptionKey: 'biografias.politicaMockNews.rail.0.summary',
    year: '1968',
    location: 'Santa Isabel (Malabo)',
  },
  {
    imageUrl: POLITICA_RAIL_MACIAS_ACTO_IMAGE,
    titleKey: 'biografias.politicaMockNews.rail.1.title',
    descriptionKey: 'biografias.politicaMockNews.rail.1.summary',
    year: '1968',
    location: 'Malabo',
  },
  {
    imageUrl: POLITICA_MOCK_IMAGES[7],
    titleKey: 'biografias.politicaMockNews.rail.2.title',
    descriptionKey: 'biografias.politicaMockNews.rail.2.summary',
    year: '1959',
    location: 'Río Muni',
  },
  {
    imageUrl: POLITICA_MOCK_IMAGES[8],
    titleKey: 'biografias.politicaMockNews.rail.3.title',
    descriptionKey: 'biografias.politicaMockNews.rail.3.summary',
    year: '1940',
    location: 'Bioko',
  },
  {
    imageUrl: POLITICA_MOCK_IMAGES[9],
    titleKey: 'biografias.politicaMockNews.rail.4.title',
    descriptionKey: 'biografias.politicaMockNews.rail.4.summary',
    year: '1970',
    location: 'Guinea Ecuatorial',
  },
  {
    imageUrl: POLITICA_MOCK_IMAGES[10],
    titleKey: 'biografias.politicaMockNews.rail.5.title',
    descriptionKey: 'biografias.politicaMockNews.rail.5.summary',
    year: '1982',
    location: 'Mongomo',
  },
  {
    imageUrl: POLITICA_MOCK_IMAGES[11],
    titleKey: 'biografias.politicaMockNews.rail.6.title',
    descriptionKey: 'biografias.politicaMockNews.rail.6.summary',
    year: '1990',
    location: 'Ebebiyín',
  },
  {
    imageUrl: POLITICA_MOCK_IMAGES[12],
    titleKey: 'biografias.politicaMockNews.rail.7.title',
    descriptionKey: 'biografias.politicaMockNews.rail.7.summary',
    year: '2000',
    location: 'Malabo',
  },
];

export const POLITICA_ALL_MOCK_SLOTS = [
  ...POLITICA_GRID_MOCK_SLOTS,
  ...POLITICA_RAIL_MOCK_SLOTS,
] as const;

export const POLITICA_MOCK_ID_PREFIX = 'politica-mock-';

export function isPoliticaMockPhotoId(id: string): boolean {
  return id.startsWith(POLITICA_MOCK_ID_PREFIX);
}
