export const MEMORIA_NACIONAL_SECTIONS = [
  {
    slug: 'introduccion',
    href: '/memoria',
    labelKey: 'memoria.sections.introduccion',
    image: '/images/equatorial-guinea-map.png',
    exact: true,
  },
  {
    slug: 'epocas-historicas',
    href: '/memoria/epocas-historicas',
    labelKey: 'memoria.sections.epocas',
    image: '/images/independencia-de-guinea.jpeg',
  },
  {
    slug: 'documentos',
    href: '/memoria/documentos',
    labelKey: 'memoria.sections.documentos',
    image: '/images/archive/desfile-militar.png',
  },
] as const;
