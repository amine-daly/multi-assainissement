import type { AppLang } from './language.constants';

/** Static Arabic service URLs (prerendered HTML for Google). */
export const AR_SERVICE_PATHS = {
  desinsectisation: '/ar/desinsectisation',
  deratisation: '/ar/deratisation',
} as const;

const AR_PREFIX = '/ar';

/** Map FR service path → prerendered Arabic path. */
export const FR_TO_AR_SERVICE: Readonly<Record<string, string>> = {
  '/desinsectisation': AR_SERVICE_PATHS.desinsectisation,
  '/deratisation': AR_SERVICE_PATHS.deratisation,
};

/** Arabic static path → French service URL (language switcher). */
export const AR_TO_FR_SERVICE: Readonly<Record<string, string>> = {
  [AR_SERVICE_PATHS.desinsectisation]: '/desinsectisation',
  [AR_SERVICE_PATHS.deratisation]: '/deratisation',
};

export function isArabicLocalePath(path: string): boolean {
  const p = normalizePathname(path);
  return p === AR_PREFIX || p.startsWith(`${AR_PREFIX}/`);
}

/** `/ar/desinsectisation` → `/desinsectisation` for shared PAGE_SEO keys. */
export function stripArabicPrefix(path: string): string {
  const p = normalizePathname(path);
  if (!p.startsWith(`${AR_PREFIX}/`)) {
    return p;
  }
  const rest = p.slice(AR_PREFIX.length);
  return rest || '/';
}

export function pathLangFromPathname(pathname: string): AppLang | null {
  const p = normalizePathname(pathname);
  if (p === AR_PREFIX || p.startsWith(`${AR_PREFIX}/`)) {
    return 'ar-sa';
  }
  return null;
}

function normalizePathname(path: string): string {
  const bare = path.split('?')[0].split('#')[0] || '/';
  if (bare.length > 1 && bare.endsWith('/')) {
    return bare.slice(0, -1);
  }
  return bare || '/';
}
