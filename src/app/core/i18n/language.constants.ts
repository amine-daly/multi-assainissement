export type AppLang = 'fr-fr' | 'en-gb' | 'ar-sa';

export interface LangOption {
  code: AppLang;
  short: string;
  label: string;
  /** Flag asset under /assets/images/flags/ */
  flag: string;
}

export const APP_LANGS: readonly LangOption[] = [
  {
    code: 'fr-fr',
    short: 'FR',
    label: 'Français',
    flag: 'assets/images/flags/fr.svg',
  },
  {
    code: 'en-gb',
    short: 'EN',
    label: 'English',
    flag: 'assets/images/flags/gb.svg',
  },
  {
    code: 'ar-sa',
    short: 'AR',
    label: 'العربية',
    flag: 'assets/images/flags/tn.svg',
  },
] as const;

export const DEFAULT_LANG: AppLang = 'fr-fr';
export const LANG_STORAGE_KEY = 'ma.lang';
/** Shareable / SEO language query param (`?lang=en-gb`). */
export const LANG_QUERY_PARAM = 'lang';

/** BCP 47 tags for `<html lang>` and hreflang. */
export const HTML_LANG: Record<AppLang, string> = {
  'fr-fr': 'fr-TN',
  'en-gb': 'en-GB',
  'ar-sa': 'ar-SA',
};

/** Open Graph `og:locale` / `og:locale:alternate`. */
export const OG_LOCALE: Record<AppLang, string> = {
  'fr-fr': 'fr_TN',
  'en-gb': 'en_GB',
  'ar-sa': 'ar_SA',
};

export function isAppLang(value: string | null | undefined): value is AppLang {
  return APP_LANGS.some((l) => l.code === value);
}
