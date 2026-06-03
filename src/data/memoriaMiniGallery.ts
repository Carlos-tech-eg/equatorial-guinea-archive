export type GalleryMasonryItem = {
  src: string;
  alt: string;
  href?: string;
};

/** Imágenes fijas del archivo para la galería de inicio. */
export const ARCHIVE_GALLERY_IMAGES: GalleryMasonryItem[] = [
  { src: '/images/independencia-de-guinea.jpeg', alt: 'Independencia de Guinea Ecuatorial' },
  { src: '/images/memoria/bio-1.png', alt: 'Retrato en la costa' },
  { src: '/images/memoria/bio-2.png', alt: 'Tradiciones y vida comunitaria' },
  { src: '/images/memoria/bio-3.png', alt: 'Buque histórico Acacio Mañe Ela' },
  { src: '/images/independencia.jpeg', alt: 'Archivo histórico' },
  { src: '/images/obig.jpeg', alt: 'Documento del archivo' },
  { src: '/images/house.jpeg', alt: 'Arquitectura colonial' },
];
