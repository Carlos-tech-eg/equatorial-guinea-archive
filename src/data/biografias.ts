export type BiografiaCategory = 'cultura' | 'musica' | 'personasHistoricas' | 'politica';

export interface BiografiaWork {
  id: string;
  imageUrl: string;
  year?: string;
}

export interface BiografiaItem {
  id: string;
  category: BiografiaCategory;
  imageUrl: string;
  year?: string;
  works?: BiografiaWork[];
}

export const BIOGRAFIA_CATEGORIES: BiografiaCategory[] = [
  'cultura',
  'musica',
  'personasHistoricas',
  'politica',
];

// Mock images by category (Unsplash – culture, music, art, portraits)
const MOCK_IMAGES = {
  cultura: {
    tradiciones:
      'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=800&q=80',
    objetosCulturales:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    mascarasFang:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
  },
  musica: {
    neneBantu:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    maele:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    fifiLaMirey:
      'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80',
    makossa:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80',
  },
  personasHistoricas: {
    ntutumu: '/images/miguel-ntutumu.png',
    colonial:
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
  },
  politica: {
    macias: '/images/francisco-macias-nguema.png',
  },
} as const;

export const biografiaItems: BiografiaItem[] = [
  // Cultura
  {
    id: 'tradiciones',
    category: 'cultura',
    imageUrl: MOCK_IMAGES.cultura.tradiciones,
    year: 'Siglos XIX–XX',
  },
  {
    id: 'objetos-culturales',
    category: 'cultura',
    imageUrl: MOCK_IMAGES.cultura.objetosCulturales,
  },
  {
    id: 'mascaras-fang',
    category: 'cultura',
    imageUrl: MOCK_IMAGES.cultura.mascarasFang,
    year: 'Siglos XIX–XX',
  },
  // Música – artistas (Nene Bantu, Maele, Fifi la Mirey, etc.)
  {
    id: 'nene-bantu',
    category: 'musica',
    imageUrl: MOCK_IMAGES.musica.neneBantu,
    year: 'Activo',
    works: [
      { id: 'album-1', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', year: '2019' },
      { id: 'album-2', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', year: '2021' },
      { id: 'single-1', imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80', year: '2023' },
    ],
  },
  {
    id: 'maele',
    category: 'musica',
    imageUrl: MOCK_IMAGES.musica.maele,
    year: 'Activo',
    works: [
      { id: 'disco-1', imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&q=80', year: '2020' },
      { id: 'disco-2', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', year: '2022' },
    ],
  },
  {
    id: 'fifi-la-mirey',
    category: 'musica',
    imageUrl: MOCK_IMAGES.musica.fifiLaMirey,
    year: 'Activo',
    works: [
      { id: 'obra-1', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', year: '2018' },
      { id: 'obra-2', imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80', year: '2021' },
      { id: 'obra-3', imageUrl: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&q=80', year: '2024' },
    ],
  },
  {
    id: 'makossa',
    category: 'musica',
    imageUrl: MOCK_IMAGES.musica.makossa,
    year: 'Siglo XX',
  },
  // Personas históricas
  {
    id: 'ntutumu',
    category: 'personasHistoricas',
    imageUrl: MOCK_IMAGES.personasHistoricas.ntutumu,
    year: 'Siglo XX',
  },
  {
    id: 'colonial',
    category: 'personasHistoricas',
    imageUrl: MOCK_IMAGES.personasHistoricas.colonial,
    year: '1778–1968',
  },
  // Política
  {
    id: 'macias',
    category: 'politica',
    imageUrl: MOCK_IMAGES.politica.macias,
    year: '1924–1979',
  },
];

export function getItemsByCategory(category: BiografiaCategory): BiografiaItem[] {
  return biografiaItems.filter((item) => item.category === category);
}

export function getBiografiaItem(category: string, id: string): BiografiaItem | undefined {
  return biografiaItems.find((item) => item.category === category && item.id === id);
}
