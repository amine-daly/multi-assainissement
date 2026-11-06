import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { SITE_CONFIG } from '../config/site.config';
import { buildBreadcrumbJsonLd } from '../seo/structured-data';
import { JsonLdService } from './json-ld.service';
import {
  APP_LANGS,
  AppLang,
  DEFAULT_LANG,
  HTML_LANG,
  LANG_QUERY_PARAM,
  OG_LOCALE,
} from '../i18n/language.constants';
import { FR_TO_AR_SERVICE, stripArabicPrefix } from '../i18n/locale-path';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  PAGE_SEO,
  SITE_URL,
  PageSeo,
} from '../seo/seo.config';

const BREADCRUMB_JSON_LD_ID = 'jsonld-breadcrumb';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly jsonLd = inject(JsonLdService);
  private initialized = false;

  /** Call once from the app shell to keep tags in sync with navigation / SSG. */
  init(): void {
    this.applyForUrl(this.router.url);

    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.applyForUrl(e.urlAfterRedirects));

    this.translate.onLangChange.subscribe(() => {
      this.applyForUrl(this.router.url);
    });
  }

  applyForUrl(url: string): void {
    const path = this.normalizePath(url);
    const logical = stripArabicPrefix(path);
    const template = PAGE_SEO[logical] ?? PAGE_SEO['/404'];
    const seo: PageSeo = { ...template, path };
    this.apply(seo);
  }

  private apply(seo: PageSeo): void {
    const pageTitle = this.translate.instant(seo.titleKey);
    const description = this.translate.instant(seo.descriptionKey);
    const ogImageAlt = this.translate.instant(DEFAULT_OG_IMAGE_ALT);
    const lang = (this.translate.getCurrentLang() || DEFAULT_LANG) as AppLang;
    const ogLocale = OG_LOCALE[lang] ?? OG_LOCALE[DEFAULT_LANG];

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'robots',
      content: seo.robots ?? 'index, follow, max-image-preview:large',
    });
    this.meta.updateTag({ name: 'author', content: SITE_CONFIG.name });
    this.meta.updateTag({
      name: 'geo.region',
      content: 'TN-23',
    });
    this.meta.updateTag({ name: 'geo.placename', content: 'Djerba' });

    const canonicalPath = seo.path === '/404' ? '/404' : seo.path;
    const pathPart = canonicalPath === '/' ? '/' : canonicalPath;
    const logicalPath = stripArabicPrefix(pathPart);
    const canonical = `${SITE_URL}${pathPart === '/' ? '/' : pathPart}`;
    this.setCanonical(canonical);
    this.setHreflang(logicalPath);

    // Open Graph — marketing pages are websites, not blog articles
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: ogLocale });
    this.setOgLocaleAlternates(lang);
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.name });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });

    const ogImagePath = seo.ogImage ?? DEFAULT_OG_IMAGE;
    const ogImage = `${SITE_URL}${ogImagePath}`;
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: ogImageAlt,
    });
    this.meta.updateTag({
      property: 'og:image:width',
      content: String(DEFAULT_OG_IMAGE_WIDTH),
    });
    this.meta.updateTag({
      property: 'og:image:height',
      content: String(DEFAULT_OG_IMAGE_HEIGHT),
    });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/webp' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });
    this.meta.updateTag({ name: 'twitter:image:alt', content: ogImageAlt });
    this.applyBreadcrumb(seo);
  }

  private applyBreadcrumb(seo: PageSeo): void {
    if (!seo.breadcrumbKey) {
      this.jsonLd.remove(BREADCRUMB_JSON_LD_ID);
      return;
    }

    this.jsonLd.set(
      BREADCRUMB_JSON_LD_ID,
      buildBreadcrumbJsonLd([
        { name: this.translate.instant('nav.home'), path: '/' },
        {
          name: this.translate.instant(seo.breadcrumbKey),
          path: seo.path,
        },
      ]),
    );
  }

  private normalizePath(url: string): string {
    const path = url.split('?')[0].split('#')[0];
    if (!path || path === '/') {
      return '/';
    }
    return path.endsWith('/') ? path.slice(0, -1) : path;
  }

  private setCanonical(href: string): void {
    let link = this.document.querySelector(
      "link[rel='canonical']",
    ) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', href);
  }

  /**
   * hreflang only where a separately prerendered translation exists (FR ↔ `/ar/...`).
   * `?lang=` URLs serve French HTML with a French canonical, so they are not valid alternates.
   */
  private setHreflang(logicalPath: string): void {
    this.document
      .querySelectorAll('link[data-i18n-hreflang]')
      .forEach((el) => el.remove());

    const arPath = FR_TO_AR_SERVICE[logicalPath];
    if (!arPath) {
      return;
    }

    const frUrl = `${SITE_URL}${logicalPath}`;
    const alternates: [string, string][] = [
      [HTML_LANG[DEFAULT_LANG], frUrl],
      [HTML_LANG['ar-sa'], `${SITE_URL}${arPath}`],
      ['x-default', frUrl],
    ];
    for (const [hreflang, href] of alternates) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      link.setAttribute('data-i18n-hreflang', hreflang);
      this.document.head.appendChild(link);
    }
  }

  private setOgLocaleAlternates(current: AppLang): void {
    this.meta.removeTag("property='og:locale:alternate'");
    for (const { code } of APP_LANGS) {
      if (code === current) {
        continue;
      }
      this.meta.addTag({
        property: 'og:locale:alternate',
        content: OG_LOCALE[code],
      });
    }
  }
}
