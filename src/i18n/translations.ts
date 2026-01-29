import type { Locale } from '@/i18n';

// @ts-expect-error JSON import
import es from '@/i18n/locales/es.json';
// @ts-expect-error JSON import
import fr from '@/i18n/locales/fr.json';
// @ts-expect-error JSON import
import photosEs from '@/i18n/locales/photos.es.json';
// @ts-expect-error JSON import
import photosFr from '@/i18n/locales/photos.fr.json';

const messages = { es, fr } as const;
const photosMessages = { es: photosEs, fr: photosFr } as const;

function getNested(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const k of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[k];
  }
  return current;
}

export function getTranslation(locale: Locale, key: string): string {
  const val = getNested(messages[locale] as Record<string, unknown>, key);
  if (typeof val === 'string') return val;
  const fallback = getNested(messages.es as Record<string, unknown>, key);
  return typeof fallback === 'string' ? fallback : key;
}

export function getPhotoTranslation(
  locale: Locale,
  photoId: string,
  field: 'title' | 'location' | 'description' | 'source'
): string {
  const p = (photosMessages[locale] as Record<string, Record<string, string>>)[photoId];
  if (!p) {
    const fallback = (photosMessages.es as Record<string, Record<string, string>>)[photoId];
    return fallback?.[field] ?? '';
  }
  return p[field] ?? (photosMessages.es as Record<string, Record<string, string>>)[photoId]?.[field] ?? '';
}

export function getAboutArchives(locale: Locale): string[] {
  const arr = (messages[locale] as { about?: { archives?: string[] } }).about?.archives;
  return Array.isArray(arr) ? arr : (messages.es as { about?: { archives?: string[] } }).about?.archives ?? [];
}
