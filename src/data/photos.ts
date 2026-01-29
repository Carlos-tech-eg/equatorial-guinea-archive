export interface Photo {
  id: string;
  title: string;
  year: string;
  location: string;
  description: string;
  source: string;
  imageUrl: string;
}

export const photos: Photo[] = [
  {
    id: '7',
    title: 'Francisco Macías Nguema',
    year: '1968–1979',
    location: 'Guinea Ecuatorial',
    description: 'Fue el primer presidente de Guinea Ecuatorial tras la independencia de España en 1968. Gobernó hasta 1979, cuando fue derrocado por un golpe de Estado encabezado por Teodoro Obiang, su sobrino.',
    source: 'Archivo histórico',
    imageUrl: '/images/francisco-macias-nguema.png'
  },
  {
    id: '1',
    title: 'Don Miguel Ntutumu',
    year: '1928–1979',
    location: 'Guinea Ecuatorial',
    description: 'Presidente del consejo provincial, Gobernador civil de Río Muni y vicepresidente de la República de Guinea Ecuatorial.',
    source: 'Archivo histórico',
    imageUrl: '/images/miguel-ntutumu.png'
  },
  {
    id: '8',
    title: 'Destacamento de Tráfico de la Guardia Civil',
    year: '1961–1969',
    location: 'Guinea Ecuatorial',
    description: 'Durante el periodo colonial, la Guardia Civil española contó con un destacamento de tráfico en Guinea Ecuatorial (1961–1969), encargado del control de la circulación, la seguridad vial y la escolta en las principales vías. Estas unidades reflejan la organización administrativa y de seguridad de la época previa y posterior inmediata a la independencia de 1968.',
    source: 'Archivo histórico',
    imageUrl: '/images/guardia-civil-trafico.png'
  },
  {
    id: '9',
    title: 'Correos, Santa Isabel',
    year: '1956',
    location: 'Santa Isabel (Malabo), Guinea Ecuatorial',
    description: 'Edificio de correos en Santa Isabel, Guinea Ecuatorial, diciembre de 1956.',
    source: 'José Miguel Rubio Polo',
    imageUrl: '/images/correos-santa-isabel-1956.png'
  },
  {
    id: '6',
    title: 'Indigenous Community Portrait',
    year: '1938',
    location: 'Río Muni, Equatorial Guinea',
    description: 'A rare photographic documentation of an indigenous community during the colonial period. This image is part of an ethnographic study conducted in the late 1930s. It provides important historical evidence of the diverse communities that existed before independence.',
    source: 'Anthropological Research Archive',
    imageUrl: 'https://images.unsplash.com/photo-1697175386388-53b3e563c6c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYWZyaWNhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2OTYzODM3N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];
