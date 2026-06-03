/**
 * Fallback hero images when Firebase has no URL or the URL fails to load.
 * Direct HTTPS (Unsplash) so <img> works reliably; Wikimedia redirects often break as img src.
 */
export const HERO_FALLBACK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1200&q=80',
    alt: 'Cultural heritage',
    year: '1939-1940',
    location: 'Guinea Ecuatorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80',
    alt: 'Historical archive',
    year: '1968',
    location: 'Guinea Ecuatorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200&q=80',
    alt: 'Colonial era',
    year: '1970',
    location: 'Guinea Ecuatorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&q=80',
    alt: 'Heritage',
    year: '1979',
    location: 'Guinea Ecuatorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80',
    alt: 'Archive',
    year: '1979',
    location: 'Mongomo, Guinea Ecuatorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200&q=80',
    alt: 'Historical record',
    year: '1970',
    location: 'Guinea Ecuatorial',
  },
] as const;
