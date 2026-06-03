'use client';

import { SplitStorySlider, type SplitStorySlide } from '@/app/components/SplitStorySlider';
import { archivoHistorico } from '@/data/archivoHistorico';

const slides: SplitStorySlide[] = archivoHistorico.map((item) => ({
  meta: item.fecha,
  categoria: item.categoria,
  titulo: item.titulo,
  extracto: item.extracto,
  imagen: item.imagen,
}));

export function StorySlider() {
  return (
    <SplitStorySlider slides={slides} ariaLabel="Historias del archivo" />
  );
}
