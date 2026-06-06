export type GalleryMasonryItem = {
  src: string;
  alt: string;
  href?: string;
  /** Texto breve bajo la imagen. */
  caption?: string;
  date?: string;
  /** Tamaño en el mosaico (lg, tall, wide, sm, md). Si no se indica, se asigna por ciclo y proporción. */
  layout?: 'sm' | 'md' | 'lg' | 'tall' | 'wide';
};

/** Imágenes fijas del archivo (hero → colecciones y /gallery). */
export const ARCHIVE_GALLERY_IMAGES: GalleryMasonryItem[] = [
  {
    src: '/images/archive/desfile-militar.png',
    alt: 'Desfile militar en la calle',
    caption: 'Formación militar y desfile urbano en el archipiélago.',
    date: 'c. 1960',
    layout: 'wide',
  },
  {
    src: '/images/archive/banda-desfile.png',
    alt: 'Banda militar en desfile costero',
    caption: 'Banda de música y tropas en ceremonia junto al litoral.',
    date: 'c. 1965',
    layout: 'sm',
  },
  {
    src: '/images/archive/tradiciones-baile.png',
    alt: 'Danza y tradiciones comunitarias',
    caption: 'Máscaras y danza tradicional ante la comunidad.',
    date: 'Siglo XX',
    layout: 'tall',
  },
  {
    src: '/images/archive/maele-chavely.png',
    alt: 'Maele — Chavely Nº1',
    caption: 'Portada de disco — Maele, Chavely Nº1.',
    date: 'c. 1970',
    layout: 'sm',
  },
  {
    src: '/images/independencia-de-guinea.jpeg',
    alt: 'Independencia de Guinea Ecuatorial',
    caption: 'Ceremonia y memoria de la independencia nacional.',
    date: '12 oct. 1968',
    layout: 'lg',
  },
  {
    src: '/images/memoria/bio-1.png',
    alt: 'Retrato en la costa',
    caption: 'Retrato en el litoral ecuatoguineano.',
    date: 'Siglo XX',
  },
  {
    src: '/images/memoria/bio-2.png',
    alt: 'Tradiciones y vida comunitaria',
    caption: 'Vida comunitaria y tradiciones del país.',
    date: 'Siglo XX',
  },
  {
    src: '/images/memoria/bio-3.png',
    alt: 'Dos personas jugando al akông',
    caption:
      'Partida de akông, juego de tablero tradicional del pueblo fang, practicado en la región continental y en todo el país.',
    date: 'Siglo XX',
  },
  {
    src: '/images/independencia.jpeg',
    alt: 'Archivo histórico',
    caption: 'Documento visual del archivo histórico.',
    date: '1968',
  },
  {
    src: '/images/obig.jpeg',
    alt: 'Documento del archivo',
    caption: 'Pieza documental del fondo del archivo.',
    date: 'Siglo XX',
  },
  {
    src: '/images/house.jpeg',
    alt: 'Arquitectura colonial',
    caption: 'Arquitectura colonial y urbanismo de la época.',
    date: 'c. 1950',
  },
];
