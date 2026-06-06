'use client';

import { useLocale } from '@/app/providers';
import { ACERCA_NAV_LINKS } from '@/data/navSubnavLinks';
import { SectionHorizontalSubnav } from '@/app/components/SectionHorizontalSubnav';

export function AcercaSubnav() {
  const { t } = useLocale();

  return <SectionHorizontalSubnav items={ACERCA_NAV_LINKS} ariaLabel={t('nav.about')} />;
}
