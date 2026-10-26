import { DOCUMENT, PlatformLocation, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, firstValueFrom } from 'rxjs';
import { SITE_CONFIG } from '../config/site.config';
import {
  APP_LANGS,
  AppLang,
  DEFAULT_LANG,
  HTML_LANG,
  LANG_QUERY_PARAM,
  LANG_STORAGE_KEY,
  isAppLang,
} from './language.constants';
import {
  AR_TO_FR_SERVICE,
  FR_TO_AR_SERVICE,
  isArabicLocalePath,
  pathLangFromPathname,
} from './locale-path';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly platformLocation = inject(PlatformLocation);

  readonly langs = APP_LANGS;
  /** Reactive current language (ngx-translate signal). */
  readonly currentLang = this.translate.currentLang;

  /** When true, keep `?lang=` on route changes (after explicit choice / stored / query). */
  private preserveLangQuery = false;
  private urlSyncBound = false;

  /**
   * Bootstrap language: ?lang= → localStorage (browser) → default FR.
   * Safe for SSR (skips localStorage / history).
   */
  async init(): Promise<void> {
    this.translate.addLangs([...APP_LANGS.map((l) => l.code)]);
    this.translate.setFallbackLang(DEFAULT_LANG);

    if (await this.maybeRedirectQueryArabicToStaticPath()) {
      return;
    }

    if (await this.stripLangQueryOnArabicPaths()) {
      /* URL cleaned; continue init on /ar/... without ?lang= */
    }

    const fromPath = pathLangFromPathname(this.platformLocation.pathname);
    const fromQuery = this.readQueryLang();
    const fromStorage = this.readStoredLang();
    const lang = fromPath ?? fromQuery ?? fromStorage ?? DEFAULT_LANG;

    this.preserveLangQuery = !!fromQuery || !!fromStorage || !!fromPath;
    await this.applyLang(lang, {
      // Persist query choice; keep storage fresh when restoring a saved lang.
      persist: !!fromQuery || !!fromStorage,
      // URL already has ?lang= — do not navigate during init (router may still be on `/`).
      syncUrl: this.preserveLangQuery && !fromQuery && !fromPath,
    });

    this.bindUrlSync();
    if (
      this.preserveLangQuery &&
      !fromQuery &&
      !fromPath &&
      isPlatformBrowser(this.platformId)
    ) {
      this.deferSyncUrlUntilNavigationReady(lang);
    }
  }

  async setLang(lang: AppLang): Promise<void> {
    this.preserveLangQuery = true;
    await this.applyLang(lang, { persist: true, syncUrl: true });
  }

  onSelectChange(value: string): void {
    if (!isAppLang(value)) {
      return;
    }
    void this.setLang(value);
  }

  whatsappDevisUrl(): string {
    const text = this.translate.instant('common.whatsappPrefill');
    const phone = SITE_CONFIG.mobile.replace('+', '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }

  private async applyLang(
    lang: AppLang,
    opts: { persist: boolean; syncUrl: boolean },
  ): Promise<void> {
    await firstValueFrom(this.translate.use(lang));
    this.applyDocumentAttrs(lang);

    if (opts.persist && isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang);
      } catch {
        /* private mode / blocked storage */
      }
    }

    if (opts.syncUrl) {
      this.syncUrl(lang);
    }
  }

  private applyDocumentAttrs(lang: AppLang): void {
    const html = this.document.documentElement;
    html.setAttribute('lang', HTML_LANG[lang]);
    html.setAttribute('dir', lang === 'ar-sa' ? 'rtl' : 'ltr');
  }

  private bindUrlSync(): void {
    if (this.urlSyncBound || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.urlSyncBound = true;

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.preserveLangQuery) {
          return;
        }
        const lang = this.translate.getCurrentLang();
        if (!isAppLang(lang)) {
          return;
        }
        this.syncUrl(lang);
      });
  }

  private syncUrl(lang: AppLang): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const win = this.document.defaultView;
    if (!win) {
      return;
    }
    // Use the browser path: during bootstrap `router.navigate([])` can run before the
    // initial URL is applied and wrongly sends `/desinsectisation` → `/`.
    const path = win.location.pathname || '/';
    const normalized =
      path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    const tree = this.router.parseUrl(
      path + win.location.search + win.location.hash,
    );

    if (isArabicLocalePath(normalized)) {
      if (lang !== 'ar-sa') {
        const frPath = AR_TO_FR_SERVICE[normalized];
        if (frPath) {
          void this.router.navigateByUrl(frPath, { replaceUrl: true });
          return;
        }
      }
      if (tree.queryParams[LANG_QUERY_PARAM]) {
        delete tree.queryParams[LANG_QUERY_PARAM];
        void this.router.navigateByUrl(tree, { replaceUrl: true });
      }
      return;
    }

    if (lang === 'ar-sa') {
      const arPath = FR_TO_AR_SERVICE[normalized];
      if (arPath) {
        void this.router.navigateByUrl(arPath, { replaceUrl: true });
        return;
      }
    }

    if (lang === DEFAULT_LANG) {
      if (tree.queryParams[LANG_QUERY_PARAM]) {
        delete tree.queryParams[LANG_QUERY_PARAM];
        void this.router.navigateByUrl(tree, { replaceUrl: true });
      }
      return;
    }

    if (tree.queryParams[LANG_QUERY_PARAM] === lang) {
      return;
    }
    tree.queryParams[LANG_QUERY_PARAM] = lang;
    void this.router.navigateByUrl(tree, { replaceUrl: true });
  }

  /** `/ar/deratisation?lang=ar-sa` → `/ar/deratisation` (path already encodes locale). */
  private async stripLangQueryOnArabicPaths(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const pathname = this.platformLocation.pathname || '/';
    if (!isArabicLocalePath(pathname)) {
      return false;
    }
    const search = this.document.defaultView?.location.search ?? '';
    if (!search.includes(LANG_QUERY_PARAM)) {
      return false;
    }
    const tree = this.router.parseUrl(pathname + search);
    delete tree.queryParams[LANG_QUERY_PARAM];
    await this.router.navigateByUrl(tree, { replaceUrl: true });
    return true;
  }

  /** Stored lang on a deep link: sync ?lang= after the router has matched the route. */
  private deferSyncUrlUntilNavigationReady(lang: AppLang): void {
    const sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        sub.unsubscribe();
        this.syncUrl(lang);
      });
  }

  /** `/desinsectisation?lang=ar-sa` → `/ar/desinsectisation` (static Arabic HTML). */
  private async maybeRedirectQueryArabicToStaticPath(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const params = new URLSearchParams(
      this.document.defaultView?.location.search ?? '',
    );
    const value = params.get(LANG_QUERY_PARAM);
    if (value !== 'ar-sa') {
      return false;
    }
    const pathname = this.platformLocation.pathname || '/';
    const normalized =
      pathname.length > 1 && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname;
    const target = FR_TO_AR_SERVICE[normalized];
    if (!target) {
      return false;
    }
    await this.router.navigateByUrl(target, { replaceUrl: true });
    const fromPath = pathLangFromPathname(target);
    const lang = fromPath ?? 'ar-sa';
    this.preserveLangQuery = true;
    await this.applyLang(lang, { persist: true, syncUrl: false });
    this.bindUrlSync();
    return true;
  }

  private readQueryLang(): AppLang | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      const params = new URLSearchParams(
        this.document.defaultView?.location.search ?? '',
      );
      const value = params.get(LANG_QUERY_PARAM);
      return isAppLang(value) ? value : null;
    } catch {
      return null;
    }
  }

  private readStoredLang(): AppLang | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      return isAppLang(stored) ? stored : null;
    } catch {
      return null;
    }
  }
}
