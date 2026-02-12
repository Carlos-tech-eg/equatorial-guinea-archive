'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Locale } from '@/i18n';
import { getStoredLocale, setStoredLocale } from '@/i18n';
import {
  getAboutArchives,
  getPhotoTranslation,
  getTranslation,
} from '@/i18n/translations';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  tp: (photoId: string, field: 'title' | 'location' | 'description' | 'source') => string;
  aboutArchives: string[];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

function LocaleProviderInner({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    setStoredLocale(l);
  }, []);

  const t = useCallback((key: string) => getTranslation(locale, key), [locale]);
  const tp = useCallback(
    (photoId: string, field: 'title' | 'location' | 'description' | 'source') =>
      getPhotoTranslation(locale, photoId, field),
    [locale]
  );
  const aboutArchives = useMemo(() => getAboutArchives(locale), [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t, tp, aboutArchives }),
    [locale, setLocale, t, tp, aboutArchives]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SiteSettingsProvider>
        <LocaleProviderInner>{children}</LocaleProviderInner>
      </SiteSettingsProvider>
    </NextThemesProvider>
  );
}
