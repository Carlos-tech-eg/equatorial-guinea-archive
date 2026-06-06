'use client';

import { GalleryIntro } from '@/app/components/GalleryIntro';

export function MemoriaIntroduccion() {
  return (
    <div className="min-h-screen bg-[#F3EEE6]">
      <GalleryIntro
        labelKey="memoria.label"
        titleKey="memoria.sections.introduccion"
        text1Key="home.purpose1"
        text2Key="home.purpose2"
      />
    </div>
  );
}
