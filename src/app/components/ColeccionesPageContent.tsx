'use client';

import { ColeccionesSlider } from '@/app/components/ColeccionesSlider';
import { ColeccionesMemoriaSection } from '@/app/components/ColeccionesMemoriaSection';

/** Bloque compartido entre inicio y `/biografias`. */
export function ColeccionesPageContent() {
  return (
    <div className="w-full min-w-0 bg-[#f4f1ea] border-t border-border/80">
      <ColeccionesSlider />
      <ColeccionesMemoriaSection />
    </div>
  );
}
