'use client';

import { useLocale } from '@/app/providers';
import { MEMORIA_NACIONAL_SECTIONS } from '@/data/memoriaNacionalSections';
import { SectionHorizontalSubnav } from '@/app/components/SectionHorizontalSubnav';

export function MemoriaNacionalSubnav() {
  const { t } = useLocale();

  return (
    <SectionHorizontalSubnav
      items={MEMORIA_NACIONAL_SECTIONS}
      ariaLabel={t('nav.memoriaNacional')}
    />
  );
}
