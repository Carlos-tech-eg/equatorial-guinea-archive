'use client';

import { ColeccionesSlider } from '@/app/components/ColeccionesSlider';
import { ColeccionesMemoriaSection } from '@/app/components/ColeccionesMemoriaSection';

export function Biografias() {
  return (
    <div className="min-h-screen w-full min-w-0 bg-[#f4f1ea]">
      <ColeccionesSlider />
      <ColeccionesMemoriaSection variant="page" />
    </div>
  );
}
