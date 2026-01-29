export type Locale = 'es' | 'fr';

export const locales: Locale[] = ['es', 'fr'];
export const defaultLocale: Locale = 'es';

const LOCALE_KEY = 'archive-locale';

export function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const s = localStorage.getItem(LOCALE_KEY);
    if (s === 'es' || s === 'fr') return s;
  } catch {}
  return defaultLocale;
}

export function setStoredLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {}
}
