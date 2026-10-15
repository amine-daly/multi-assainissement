import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

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

    const fromQuery = this.readQueryLang();
    const fromStorage = this.readStoredLang();
    const lang = fromQuery ?? fromStorage ?? DEFAULT_LANG;

    this.preserveLangQuery = !!fromQuery || !!fromStorage;
    await this.applyLang(lang, {
      // Persist query choice; keep storage fresh when restoring a saved lang.
      persist: !!fromQuery || !!fromStorage,
      syncUrl: this.preserveLangQuery,
    });

    this.bindUrlSync();
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
        const tree = this.router.parseUrl(this.router.url);
        if (tree.queryParams[LANG_QUERY_PARAM] === lang) {
          return;
        }
        this.syncUrl(lang);
      });
  }

  private syncUrl(lang: AppLang): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    void this.router.navigate([], {
      queryParams: { [LANG_QUERY_PARAM]: lang },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
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
