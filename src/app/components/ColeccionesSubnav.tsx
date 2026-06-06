'use client';

import { useLocale } from '@/app/providers';
import { COLECCIONES_NAV_LINKS } from '@/data/navSubnavLinks';
import { SectionHorizontalSubnav } from '@/app/components/SectionHorizontalSubnav';

export function ColeccionesSubnav() {
  const { t } = useLocale();

  return (
    <SectionHorizontalSubnav
      items={COLECCIONES_NAV_LINKS}
      ariaLabel={t('nav.biografias')}
    />
  );
}
